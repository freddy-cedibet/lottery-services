module.exports = {
    // Specifies the Jest preset - needed for TypeScript
    preset: 'ts-jest',

    // Indicates whether each individual test should be reported during the run
    verbose: true,

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['json', 'text', 'lcov', 'clover'],

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

    // A map from regular expressions to module names or to arrays of module names
    // that allow to stub out resources, like images or styles, with a single module
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules/'],

    // A preset that is used as a base for Jest's configuration
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
};
