const cityData = require('./city.data-3')
//判断是否是便携设备
const isMobile = (userAgentInfo) => {
  const Agents = ["android", "iphone",
    "symbianos", "windows phone",
    "ipad", "ipod"
  ];
  let flag = false;
  if (userAgentInfo) {
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = true;
        break;
      }
    }
  }
  return flag;
}
const isMobileNumber = (value) => {
  var reg = /^1[0-9]{10}$/;
  return reg.test(value);
}
const getUrlParam = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
const getUrlParamByUrlName = (url, name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  let index = url.indexOf('?')
  var r = url.substr(index + 1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
const getOrderAddress = ({ prov, city, area, address }, split = ',') => {
  let provinceName, cityName, areaName, addressRes
  // 获取省
  let provinceItem = cityData.find(pitem => {
    return pitem.value == prov
  })
  if (!provinceItem) return ''
  provinceName = provinceItem.text || ''
  // 获取市
  let cityItem = provinceItem.children.find(citem => {
    return citem.value == city
  })
  if (!cityItem) return provinceName + address
  cityName = cityItem.text || ''
  // 获取区
  let areaItem = cityItem.children.find(aitem => {
    return aitem.value == area
  })
  if (!areaItem) return provinceName + cityName + address
  areaName = areaItem.text || ''
  addressRes = address || ''
  // if (addressRes) {
  //   return provinceName + ',' + cityName + ',' + areaName
  // }
  return provinceName + split + cityName + split + areaName + split + addressRes
}
const getAddressNameValues = ({ prov, city, area }) => {
  let provinceName, cityName, areaName
  // 获取省
  let provinceItem = cityData.find(pitem => {
    return pitem.value == prov
  })
  if (!provinceItem) return ''
  provinceName = provinceItem.text || ''
  // 获取市
  let cityItem = provinceItem.children.find(citem => {
    return citem.value == city
  })
  if (!cityItem) return provinceName + address
  cityName = cityItem.text || ''
  // 获取区
  let areaItem = cityItem.children.find(aitem => {
    return aitem.value == area
  })
  if (!areaItem) return provinceName + cityName + address
  areaName = areaItem.text || ''
  return { provinceName, cityName, areaName }
}
const getAddressValue = ({ provinceName, cityName, areaName }) => {
  let prov, city, area
  // 获取省
  let provinceItem = cityData.find(pitem => {
    return pitem.text == provinceName
  })
  if (!provinceItem) {
    return ''
  }
  prov = provinceItem.value
  // 获取市
  let cityItem = provinceItem.children.find(citem => {
    return citem.text == cityName
  })
  if (!cityItem) {
    return ''
  }
  city = cityItem.value
  // 获取区
  let areaItem = cityItem.children.find(aitem => {
    return aitem.text == areaName
  })
  if (!areaItem) {
    return ''
  }
  area = areaItem.value
  return { prov, city, area }
}
module.exports = {
  isMobile,
  isMobileNumber,
  getUrlParam,
  getOrderAddress,
  getAddressNameValues,
  getAddressValue,
  getUrlParamByUrlName
}