const { getJestProjects } = require('@nrwl/jest');
const presetJest = require('./jest.preset');

module.exports = { projects: getJestProjects(), ...presetJest };
