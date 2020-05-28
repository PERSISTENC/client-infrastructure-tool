import { Base64 } from 'js-base64'
// TODO 使用npm 管理
import Crypto from './crypto/crypto.js';
import './crypto/hmac.js';
import './crypto/sha1.js';

export function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
//生成文件上传的参数
export function getOssUploadFile(file, fileDirName,ossData) {
    function get_suffix(filename) {
      var pos = filename.lastIndexOf('.');
      var suffix = '';
      if (pos != -1) {
        suffix = filename.substring(pos)
      }
      return suffix;
    }
    if (!fileDirName) {
      fileDirName = 'map/home/';
    }
    const date = new Date()
    const month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()
    const fileUrl = fileDirName + date.getFullYear() + month + day + '/' + random_string(10) + date.getTime() + get_suffix(file.name)
    return {
      key: fileUrl,
      policy:ossData.policyBase64 ,
      success_action_status: '200',
      OSSAccessKeyId: ossData.ossAccessId,
      signature: ossData.ossSignature
    }
  }
  