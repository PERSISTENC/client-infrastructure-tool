/* 邮箱验证 */
export function isWscnEmail (str) {
  const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  return reg.test(str)
}

export function isSpecial (str) {
	const reg = /[^\u4e00-\u9fa5a-zA-Z0-9\^、，。,.~-——]/;
	return reg.test(str)
}

/* URL验证 */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

//字母排序转成字符串 
export function sortByKey(obj, flag) {
  if (!obj) {
      return {};
  }
  var newObj = {};
  var sortKeys;
  //对对象递归去null，但是递归不会排序
  if (flag) {
      sortKeys = Object.keys(obj)
  } else {
      sortKeys = Object.keys(obj).sort(function (key1, key2) {
          return key1 > key2 ? 1 : -1;
      });
  }
  sortKeys.forEach(v => {
      if (obj[v] != null) {
          newObj[v] = obj[v];
      }
      if (obj[v] && Object.prototype.toString.call(obj[v]) === '[object Object]') {
          newObj[v] = sortByKey(obj[v], true);
      } else {
          if (obj[v] != null) {
              newObj[v] = obj[v];
          }
      }
  });
  return newObj;
}

//校验手机格式
export function checkMobile(mobile){
  return RegExp(/^1[34578]\d{9}$/).test(mobile);
}

//手机号码中间4位替换为星号
export function replaceMobile(mobile){
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * @description 格式话 时间锉
 */
export function format (fmt, date)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}
