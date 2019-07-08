/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function(address) {
    return address.split('.').join('[.]')
};

var defangIPaddr = function(address) {
    return address.replace(/\./gi, '[.]')
};
