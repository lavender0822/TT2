var crypto = require("crypto");
var utils = {};

//AES解密
utils.desDecode = function (desKey, data) {
  var cipherChunks = [];
  var decipher = crypto.createDecipheriv('aes-128-ecb', desKey, '');
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(data, 'base64', 'utf8'));
  cipherChunks.push(decipher.final('utf8'));
  return cipherChunks.join('');
}
//AES加密
utils.desEncode = function desEncode(desKey, data) {
  var cipherChunks = [];
  var cipher = crypto.createCipheriv('aes-128-ecb', desKey, '');
  cipher.setAutoPadding(true);
  cipherChunks.push(cipher.update(data, 'utf8', 'base64'));
  cipherChunks.push(cipher.final('base64'));

  return cipherChunks.join('');
}

//MD5加密
utils.keyEncode = function desEncode(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

module.exports = utils;