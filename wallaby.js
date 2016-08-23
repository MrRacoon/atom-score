module.exports = () => {
  return {
    files: [
      'lib/state/*.js',
    ],
    tests: [
      'spec/state/spec.js'
    ],
    debug: true
  };
};
