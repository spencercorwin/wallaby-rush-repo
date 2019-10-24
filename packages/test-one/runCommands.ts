// tslint:disable no-console
import execa from "execa";

const run = async (command: string) => {
  const splitCommand = command.split(" ");
  const { stdout } = await execa(splitCommand[0], splitCommand.slice(1));
  // const outputArray = outputToArray(stdout);
  switch (splitCommand[1]) {
    case "check":
      await rushCheck(stdout);
      break;
    case "change":
      await rushChange(stdout);
      break;
    default:
      return;
  }
};

const rushCheck = async (commandOutput: string) => {
  console.log("checking rush check");
  if (commandOutput.includes("Found no mis-matching dependencies!")) {
    throw new Error(commandOutput);
  }
};

const rushChange = async (commandOutput: string) => {
  console.log("checking rush change");
  if (
    !commandOutput.includes(
      "No changes were detected to relevant packages on this branch. Nothing to do."
    )
  ) {
    throw new Error(commandOutput);
  }
};

export const runCommands = (commandsArray: readonly string[]) => {
  Promise.all(
    commandsArray.map(async command => {
      await run(command);
    })
  )
    .then(() => {
      console.log("Git hook passed");
      process.exit(0);
    })
    .catch(error => {
      console.log(`Hook check failed:`);
      console.error(error);
      process.exit(1);
    });
};
