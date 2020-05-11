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
    const dateOver = new Date(date.getTime() + 5 * 60 * 1000)
    const policyText = {
        "expiration": dateOver.toISOString(), //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        "conditions": [
          ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
        ]
      }
    const policyBase64 = Base64.encode(JSON.stringify(policyText))
    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, ossData.ossAccessKey, {asBytes: true})
    const signature = Crypto.util.bytesToBase64(bytes)
    return {
      key: fileUrl,
      policy: policyBase64,
      success_action_status: '200',
      OSSAccessKeyId: ossData.ossAccessId,
      signature: signature
    }
  }
  