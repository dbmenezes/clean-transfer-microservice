
export default {
  roots: ['<rootDiv>/src'],
  collectCoverageFrom: ['<rootDiv>/src/**/*.ts'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }

};
