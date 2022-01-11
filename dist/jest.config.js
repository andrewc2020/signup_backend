module.exports = {
    // testEnvironment: "jsdom",
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/tests/e2e'],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
        '^@/components/(.*)': '<rootDir>/components/$1',
        '^@/lib/(.*)': '<rootDir>/lib/$1',
    }
};
//# sourceMappingURL=jest.config.js.map