const configuration = {
    bail: 3,
    clearMocks: true,

    collectCoverageFrom: [
        '**/source/**/*.ts',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!**/source/index.ts'
    ],

    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'text', 'lcov', 'clover'],

    maxWorkers: '50%',

    moduleFileExtensions: ['js', 'ts', 'json'],

    testEnvironment: 'node',
    testRegex: '.*\\.test\\.ts$',

    transform: {
        '^.+\\.ts$': 'ts-jest'
    }
};

export default configuration;
