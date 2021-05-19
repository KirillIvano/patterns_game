module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: 'spec/.*\\.spec\\.ts$',
    moduleFileExtensions: ['ts', 'js'],
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
    },
};
