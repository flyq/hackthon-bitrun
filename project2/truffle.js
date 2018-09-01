module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
	development: {
	    host: '121.196.200.225', // your host
	    port: 1337,
	    network_id: '*',
	    privateKey: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
	    quota:9999999,
	},
    },
}
