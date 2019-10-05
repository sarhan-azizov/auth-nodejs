const CryptoJS = require('crypto-js');

const secret = "sARhAn_and.TomMy-foRevE";
const crypt = data => CryptoJS.AES.encrypt(data, secret).toString();
const decrypt = data => CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8);

const getExpirationDateByHours = (date = Date.now(), hours = 8) => date + hours * 60 * 60 * 1000;

module.exports = {
    secret,
    decrypt,
    crypt,
    getExpirationDateByHours
};
