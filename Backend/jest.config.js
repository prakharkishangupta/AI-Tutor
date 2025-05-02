export default {
    testEnvironment: 'node',
    transform: {},
    extensionsToTreatAsEsm: ['.js'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'controller/**/*.js',
        'services/**/*.js',
        'model/**/*.js'
    ],
    coverageReporters: ['html', 'text', 'lcov'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    }
};