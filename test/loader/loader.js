module.exports = {
  getSource: function (name) {
    return {
      src: 'Hello, {{ name }}!',
      path: name
    }
  }
}
