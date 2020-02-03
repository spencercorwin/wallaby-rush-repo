var path = require("path");

module.exports = function(wallaby) {
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(wallaby.localProjectDir, "common", "temp", "node_modules");
  return {
    files: [
      {
        pattern: "packages/build-tools/**/*",
        instrument: false
      },
      {
        pattern: "packages/test-one/package.json",
        instrument: false
      },
      {
        pattern: "packages/test-one/tsconfig.json",
        instrument: false
      },
      "packages/test-one/src/**/*.ts",
      "!packages/*/src/**/*.test.ts?(x)",
      "!packages/*/.rush/**/*",
      "!packages/*/node_modules/**"
    ],
    tests: ["packages/test-one/src/__tests__/stringy.test.ts"],
    env: {
      type: "node",
      runner: "node"
    },
    testFramework: "jest",
    compilers: {
      "**/*.ts?(x)": wallaby.compilers.typeScript({
        ...require("./packages/build-tools/tsconfig.jest.json").compilerOptions
      })
    },
    setup: function(wallaby) {
      var jestConfig = require("./packages/build-tools/unit.js");
      jestConfig.transform = {
        "^.+\\.tsx?$": `ts-jest`
      };
      delete jestConfig.rootDir;
      wallaby.testFramework.configure(jestConfig);
    },
    hints: {
      testFileSelection: {
        include: /wallaby\.only/,
        exclude: /wallaby\.skip/
      },
      ignoreCoverage: /istanbul ignore next/
    },
    trace: true
  };
};
