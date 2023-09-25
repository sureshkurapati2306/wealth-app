const { getJestProjects } = require('@nrwl/jest');

module.exports = {
    testTimeout: 10000,
    testPathIgnorePatterns: [],
    moduleNameMapper: {
        '^lodash-es/(.*)$': 'lodash/$1',
    },
    projects: getJestProjects(),
    transform: {
        '^.+.(ts|mjs|js|html)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
