const { defaults } = require('jest-config')

module.exports = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'js', 'json'],
  collectCoverage: false,
  coverageReporters: ['html'],
  collectCoverageFrom: [
    'app/**/*.ts', 
    'app/**/*.js', 
    '!app/**/main/**',
    '!app/api.ts',
    '!app/server.ts',
    '!app/container.ts',
  ],
  coverageDirectory: './__tests__/coverage',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'node',
  bail: false,
  clearMocks: true,
  preset: "@shelf/jest-mongodb"
}
