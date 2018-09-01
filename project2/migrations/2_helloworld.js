var HelloWorld = artifacts.require('HelloWorld')

module.exports = function(deployer) {
  deployer.deploy(HelloWorld, 'BitRunHackthon').then((res) => {
  })
}
