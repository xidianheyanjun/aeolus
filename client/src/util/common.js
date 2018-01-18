import string from './string';

let parseParam = ()=> {
  let search = location.search || "";
  let paramString = search.substring(1);
  let paramArr = paramString.split("&");
  let paramObj = {};
  for (let i = 0; i < paramArr.length; i++) {
    let paramItem = paramArr[i].split("=");
    paramObj[string.trim(paramItem[0])] = string.trim(paramItem[1]);
  }
  return paramObj;
};

// 合并对象
let extend = (target, source)=> {
  if (!source) {
    return target;
  }
  target = target || {};
  for (let key in source) {
    target[key] = source[key];
  }
  return target;
};

export default {
  extend,
  parseParam
};
