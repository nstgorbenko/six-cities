module.exports = {
  rootDir: `./src`,
  setupFiles: [`../setup-tests.js`],
  transform: {
    "^.+\\.tsx?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`,
  },
  testRegex: `.test.(js?|jsx?|tsx?)$`,
  moduleFileExtensions: [
    `ts`,
    `tsx`,
    `js`,
    `jsx`,
    `json`,
    `node`
  ],
  collectCoverage: true,
  coverageReporters: [`lcov`],
  coverageDirectory: `../test-coverage`,
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  moduleDirectories: [`node_modules`, `src`]
};
