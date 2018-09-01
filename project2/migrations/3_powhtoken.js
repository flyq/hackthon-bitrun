var PowhToken = artifacts.require('PowhToken')

module.exports = function(deployer) {
  deployer.deploy(PowhToken, 1).then((res) => {
  })
}
