const nodePath = require("path");

const jest_root = nodePath.resolve(__dirname);

module.exports = {
  rootDir: nodePath.resolve(__dirname, "..", ".."),
  displayName: "unit",
  testRegex: "^.*/__tests__/.*\\.test\\.tsx?$",
  modulePathIgnorePatterns: ["<rootDir>/common/"],
  globals: {
    "ts-jest": {
      tsConfig: `${jest_root}/tsconfig.jest.json`,
      isolatedModules: true
    }
  },
  moduleFileExtensions: ["js", "jsx", "json", "node", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["node_modules", "/packages/.*/lib/"],
  transform: {
    "^.+\\.tsx?$": `${jest_root}/node_modules/ts-jest`
  }
};
