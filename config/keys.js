// keys.js - logic to return correct credentials

if(process.env.NODE_ENV === 'production'){
    // Return prod keys
    module.exports = require('./prod');
}
else {
    // Return dev keys
    module.exports = require('./dev');
}