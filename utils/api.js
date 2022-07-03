const { baseUrl, get, post, postForm, requestDelete, getFromStorage } = require('./util')
// const cityData = require('./city.data-3')
//登录接口
export const login = async (params) => {
    const url = '/api/applet/login'
    return await postForm(url, params)
}
//-------------------------------------------------员工管理
// 获取员工列表
export const queryEmplyeeList = async (params) => {
    const url = '/api/propertyEmployee/no-page'
    return await get(url, params)
}
// 获取角色列表
export const queryRoleList = async () => {
    const url = '/api/propertyRole/queryList'
    return await get(url)
}
// 获取省
export const queryProvinceList = async () => {
    const url = '/api/propertyRegion/province'
    return await get(url)
}
// 获取市
export const queryCityList = async (code) => {
    const url = `/api/propertyRegion/city/${code}`
    return await get(url)
}
// 获取县
export const queryCountryList = async (code) => {
    const url = `/api/propertyRegion/county/${code}`
    return await get(url)
}
// 获取小区列表
export const queryCommunityList = async (params) => {
    const url = '/api/propertyCommunity/queryList'
    return await get(url, params)
}
// 创建员工
export const createEmployee = async (params) => {
    const url = '/api/propertyEmployee/createEntity'
    return await post(url, params)
}
// 查询员工详情】
export const queryEmpInfo = async (id) => {
    const url = `/api/propertyEmployee/queryInfo/${id}`
    return await get(url)
}
// 员工删除
export const delEmpInfo = async (id) => {
    const url = `/api/propertyEmployee/deleteInfo/${id}`
    return await get(url)
}
// 离职员工
export const departureEmpInfo = async (id) => {
    const url = '/api/propertyEmployee/departureEmployee'
    return await get(url, { id })
}
//----------------------------------------------------------库存管理
//获取房东下的仓库列表
export const queryWarehouseList = async () => {
    const url = '/api/propertyWarehouse/queryWarehouseList'
    return await get(url)
}
// 查询库存
export const queryStockList = async (params) => {
    const url = '/api/propertyInventory/queryList'
    return await get(url, params)
}
// 查询产品历史进出库记录
export const queryProductRecords = async (params) => {
    const url = '/api/propertyPutWarehouseRecord/queryRecords'
    return await get(url, params)
}
// 查询仓库产品信息
export const queryProductStockDetail = async (params) => {
    const url = '/api/propertyInventory/queryDetail'
    return await get(url, params)
}
//---------------------------------------------------------房屋管理
// 获取小区下 栋列表
export const queryBuildList = async (id) => {
    const url = '/api/propertyRoom/queryBuildInfo'
    return await get(url, { communityId: id })
}

// 获取可租房间列表
export const queryRoomList = async (params) => {
    const url = '/api/propertyRoom/canRentList'
    return await get(url, params)
}
// 房屋分析
export const queryRommsStatus = async (params) => {
    const url = '/api/propertyRoom/queryRoomStatus'
    return await get(url, params)
}
// 查询租户列表
export const queryRenterList = async (comId) => {
    const url = '/api/propertyLeaseRecord/queryInRentList?communityIds=' + comId
    return await post(url)
}
//查询租客详情
export const queryRenterInfo = async (id) => {
    const url = `/api/propertyTenant/queryInfo/${id}`
    return await get(url)
}
// 获取栋下 层号列表
export const queryLayerList = async (params) => {
    const url = '/api/propertyRoom/queryLayerInfo'
    return await get(url, params)
}
// 获取层下房间列表
export const queryRooms = async (params) => {
    const url = '/api/propertyRoom/queryRooms'
    return await get(url, params)
}
// 新增租客信息
export const addRenter = async (params) => {
    const url = '/api/propertyTenant/createEntity'
    return await post(url, params)
}
// 新增调价
export const addChangePrice = async (params) => {
    const url = '/api/propertyAdjustPriceRecord/createEntity'
    return await post(url, params)
}
// 查询房屋租赁记录
export const queryHouseRentRecords = async (params) => {
    const url = '/api/propertyLeaseRecord/queryList'
    return await get(url, params)
}
//--------------------------采购-----------------------------

export const queryBuyRecords = async (params) => {
    const url = '/api/propertyProcurementRecord/queryPage'
    return await get(url, params)
}
//--------------------------报修-------------------------------------
// 查询报修记录
export const queryRepairRecords = async (params) => {
    const url = '/api/propertyRepairRecord/queryList'
    return await get(url, params)
}
// 创建报修
export const createRepair = async (params) => {
    const url = '/api/propertyRepairRecord/createRepairRecord'
    return await post(url, params)
}
// chaxunbaoxiushixiang
export const queryRepaireItems = async () => {
    const url = '/api/propertyRepairItem/no-page'
    return await get(url)
}
// 查询报修详情
export const queryRepairInfo = async (id) => {
    const url = `/api/propertyRepairRecord/queryInfo/${id}`
    return await get(url)
}
// 查询报修详情列表
export const queryRepairDetailList = async (id, status) => {
    const url = `/api/propertyRepairRecord/queryDetailList/${id}?status=${status}`
    return await get(url)
}
// 修改报修状态
export const changeRepairStatus = async (params) => {
    const url = '/api/propertyRepairRecord/updateStatus'
    return await get(url, params)
}
// 查询派单列表
export const queryDelegateList = async (params) => {
    const url = '/api/propertyRepairRecord/queryDelegateList'
    return await get(url, params)
}
// 查询员工列表
export const queryEmpList = async (params) => {
    const url = '/api/propertyEmployee/no-page'
    return await get(url, params)
}
// 委派任务
export const dispatchTask = async (params) => {
    const url = '/api/propertyRepairRecord/delegateTasks'
    return await get(url, params)
}
// 中止任务
export const stopRepairTask = async (params) => {
    const url = '/api/propertyRepairRecord/stopRepair'
    return await get(url, params)
}
//api/propertyWaterElectricityTask/queryList  查询抄水电任务列表
export const queryWaterElecTaskList = async (params) => {
    const url = '/api/propertyWaterElectricityTask/queryList'
    return await get(url, params)
}
///api/propertyWaterElectricityTask/delegateTasks 委派抄水电任务
export const dispatchWaterElecTask = async (params) => {
    const url = '/api/propertyWaterElectricityTask/delegateTasks'
    return await get(url, params)
}

//-----------------------库存------------
// 查询出入库记录
export const queryInOutList = async (params) => {
    const url = '/api/propertyPutWarehouseRecord/queryMyList'
    return await get(url, params)
}
// 查询产品列表
export const queryProductList = async () => {
    const url = '/api/propertyInventory/queryList'
    return await get(url)
}
// 创建出入库
export const createInOut = async (params) => {
    const url = '/api/propertyPutWarehouseRecord/createRecord'
    return await post(url, params)
}
// 查询待出入库列表
export const queryInOrOutList = async (params) => {
    const url = '/api/propertyPutWarehouseRecord/queryList'
    return await get(url, params)
}

// 根据出入库单号查询子单号列表
export const queryInOutDetailList = async (params) => {
    const url = '/api/propertyPutWarehouseRecord/queryByNo'
    return await get(url, params)
}
///api/propertyPutWarehouseRecord/queryList 查询需要执行出入库记录
export const needInOutTaskList = async (params) => {
    const url = '/api/propertyPutWarehouseRecord/queryList'
    return await get(url, params)
}
///api/propertyPutWarehouseRecord/queryDetail 查看需要出入库详情
export const queryTaskDetail = async (params) => {
    const url = '/api/propertyPutWarehouseRecord/queryDetail'
    return await get(url, params)
}
//api/propertyWarehouse/queryAreaList/ 查看仓库的区域列表
export const queryAreaListByHouse = async (params) => {
    const url = '/api/propertyWarehouse/queryAreaList'
    return await get(url, params)
}
///api/propertyPutWarehouseRecord/perform 执行出入库
export const handleInOut = async (params) => {
    const url = '/api/propertyPutWarehouseRecord/perform'
    return await get(url, params)
}
// //  查询管理小区下的仓库列表
// export const queryWarehouseList = async () => {
//     const url = '/api/propertyWarehouse/queryWarehouseList'
//     return await get(url)
// }


//上传文件ba
// const upload = async (files) => {
//     const skey = getFromStorage('skey')
//     const promiseArr = []
//     files.tempFilePaths.forEach(filePath => {
//         const promise = new Promise((resolve, reject) => {
//             wx.uploadFile({
//                 url: baseUrl + '/innobeautylocal/imgUpload', //仅为示例，非真实的接口地址
//                 filePath: filePath,
//                 name: 'file',
//                 header: { skey },
//                 success(res) {
//                     let result = JSON.parse(res.data)
//                     let urls = result.date
//                     resolve(urls)
//                 },
//                 fail(err) {
//                     console.log(err)
//                 }
//             })
//         })
//         promiseArr.push(promise)
//     })

//     return new Promise((resolve, reject) => {
//         Promise.all(promiseArr).then(res => {
//             resolve({ urls: res })
//         })
//     })
// }
// // 获取banner图列表
// const getBannerList = async () => {
//     const url = baseUrl + `/innobeautylocal/frontend/banner/list`
//     const result = await get(url)
//     return result
// }
// // 获取首页商品列表
// const getIndexList = async (type) => {
//     const url = baseUrl + `/innobeautylocal/frontend/commodity/list/${type}`
//     const result = await get(url)
//     return result
// }
// // 获取首页分组的素材图片
// const getIndexMaterial = async () => {
//     const url = baseUrl + '/innobeautylocal/frontend/commodity/material'
//     const result = await get(url)
//     return result
// }
// //  获取用户在后台的信息
// const getUserInfo = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/info'
//     const result = await get(url, { skey })
//     return result
// }
// // 获取 各状态的订单数目
// const getOrderCount = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/orderCount'
//     const result = await get(url, { skey })
//     return result
// }
// // "登录页面" 登录接口
// const login = async ({ username, password }) => {
//     const url = baseUrl + '/innobeautylocal/auth/login'
//     const result = await post(url, { username, password })
//     return result
// }
// // 商品详情 获取
// const getProductInfo = async (commodityId) => {
//     const url = baseUrl + `/innobeautylocal/frontend/commodity/${commodityId}`
//     const result = await get(url)
//     return result
// }
// // 商品详情 获取购物车数量
// const getCartNumber = async () => {
//     const skey = getFromStorage('skey')
//     const cookie = getFromStorage('cart')
//     const url = baseUrl + '/innobeautylocal/carts/commoditys/sum'
//     const result = await get(url, { cookie, skey })
//     return result
// }
// // 点击加入购物车
// const addToCart = async ({ commodityId, amount }) => {
//     // let cookieUser = getFromStorage('cookie')
//     let cookie = getFromStorage('cart')
//     // let cookie = cookieUser || cookieCart
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/carts'
//     //const result = await post(url, { commodityId, amount }, { cookie, 'content-type': 'application/x-www-form-urlencoded' })
//     const result = await new Promise((resolve, reject) => {
//         wx.request({
//             url,
//             method: 'POST',
//             header: { skey, cookie },
//             data: { commodityId },
//             success(res) {
//                 if (res.header['Set-Cookie']) {
//                     wx.setStorageSync('cart', res.header['Set-Cookie']); //保存Cookie到Storage
//                 }
//                 resolve(res.data)
//             }
//         })
//     })
//     return result
// }
// // 进入购物车获取购物车信息
// const getCartList = async () => {
//     const skey = getFromStorage('skey')
//     const cookie = getFromStorage('cart')

//     const url = baseUrl + '/innobeautylocal/carts'
//     const result = await get(url, { skey, cookie })
//     let reData = result.date || {}
//     let { cartCommodityVoList, cartTotalPrice, cartTotalQuantity, selectedAll } = reData

//     let cartList = cartCommodityVoList || []
//     return { cartList, cartTotalPrice, cartTotalQuantity, selectedAll }
// }
// //购物车某商品的数量更新
// const cartOneUpdate = async ({ commodityId, quantity, selected = false }) => {
//     const skey = getFromStorage('skey')
//     const cookie = getFromStorage('cart')
//     const url = baseUrl + `/innobeautylocal/carts/${commodityId}`
//     const result = await new Promise((resolve, reject) => {
//         wx.request({
//             url,
//             method: 'PUT',
//             data: {
//                 quantity,
//                 selected
//             },
//             header: { cookie, skey },
//             success(res) {
//                 if (res.header['Set-Cookie']) {
//                     wx.setStorageSync('cart', res.header['Set-Cookie']); //保存Cookie到Storage
//                 }
//                 resolve(res.data)
//             }
//         })
//     })
//     let { cartCommodityVoList, cartTotalPrice, cartTotalQuantity, selectedAll } = result.date
//     let cartList = cartCommodityVoList || []
//     return { cartList, cartTotalPrice, cartTotalQuantity, selectedAll }
// }
// // 购物车删除商品 入参为数组
// const deleteFromCart = async ({ ids }) => {
//     const skey = getFromStorage('skey')
//     const cookie = getFromStorage('cart')
//     const url = baseUrl + '/innobeautylocal/carts'
//     // const result = await requestDelete(url, { ids }, { cookie, skey })
//     const result = await new Promise((resolve, reject) => {
//         wx.request({
//             url, method: 'DELETE', header: { cookie, skey }, data: { ids }, success(res) {
//                 if (res.header['Set-Cookie']) {
//                     wx.setStorageSync('cart', res.header['Set-Cookie']); //保存Cookie到Storage
//                 }
//                 resolve(res.data)
//             }
//         })
//     })
//     let { cartCommodityVoList, cartTotalPrice, cartTotalQuantity, selectedAll } = result.date
//     let cartList = cartCommodityVoList || []
//     return { cartList, cartTotalPrice, cartTotalQuantity, selectedAll }
// }
// // 购物车商品 全选/全不选
// const cartSelectAllToggle = async (type) => {
//     const skey = getFromStorage('skey')
//     const cookie = getFromStorage('cart')
//     let url = baseUrl + '/innobeautylocal/carts/selectAll'
//     if (type == 0) {
//         url = baseUrl + '/innobeautylocal/carts/unSelectAll'
//     }
//     const result = await new Promise((resolve, reject) => {
//         wx.request({
//             url,
//             method: 'PUT',
//             header: { cookie, skey },
//             success(res) {
//                 if (res.header['Set-Cookie']) {
//                     wx.setStorageSync('cart', res.header['Set-Cookie']); //保存Cookie到Storage
//                 }
//                 resolve(res.data)
//             }
//         })
//     })
//     let { cartCommodityVoList, cartTotalPrice, cartTotalQuantity, selectedAll } = result.date
//     let cartList = cartCommodityVoList || []
//     return { cartList, cartTotalPrice, cartTotalQuantity, selectedAll }
// }
// // 获取用户地址列表
// const getUserAddressList = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/address/list'
//     const result = await get(url, { skey })
//     return result
// }
// // 删除某个收货地址
// const delAddress = async (id) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/address/delete'
//     const result = await requestDelete(url, { ids: [id] }, { skey })
//     return result
// }
// //添加/修改收货地址
// const addAddress = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/address'
//     const result = await post(url, params, { skey })
//     return result
// }
// // 提交订单
// const addOrder = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/order'
//     const result = await post(url, params, { skey })
//     return result
// }
// // 提交订单时获取积分抵扣规则
// const getIntegralRights = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal//integral/rights'
//     const result = await get(url, { skey })
//     return result
// }
// // 获取运费及待创建订单
// const freightCalc = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/freight/calc'
//     const result = await post(url, params, { skey })
//     return result
// }

// // 获取我的订单列表
// const getOrderList = async ({ type, pageNo, pageSize }) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/orders'
//     /**
//     * 0、待付款
//     * 1、待发货
//     * 2、待收货
//     * 3、全部
//     */
//     // let params = {
//     //     type
//     // }
//     // if (type == 2) {
//     //     params.waitForShip = true
//     // }
//     // if (type == 0) {
//     //     params.allOrder = true
//     // }
//     // if (type == 1) {
//     //     params.orderStatus = 0
//     // }
//     // if (type == 3) {
//     //     params.orderStatus = 3
//     // }
//     const result = await post(url, { type, pageNo, pageSize }, { skey })
//     return result
// }
// // 取消订单
// const cancelOrder = async (id) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/order/${id}`
//     const result = await requestDelete(url, {}, { skey })
//     return result
// }
// //删除订单
// const deleteOrder = async (id) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/order/delete/${id}`
//     const result = await requestDelete(url, {}, { skey })
//     return result
// }
// // 确认收货
// const confirmReceipt = async (id) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/order/confirmReceipt/${id}`
//     const result = await post(url, {}, { skey })
//     return result
// }
// // 获取订单详情
// const getOrderInfo = async (id) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/order/${id}`
//     const result = await get(url, { skey })
//     let list = result.date.orderDetailList
//     // let addressInfo = result.data.userAddress || {}
//     // let orderAmountTotal, productCount
//     // let addressDetailName = getOrderAddress({ ...addressInfo }, '') || ''
//     // list.forEach(item => {
//     //     orderAmountTotal += Number(item.subtotal)
//     //     productCount += Number(item.number)
//     // })
//     // return { result, list, addressInfo, addressDetailName, orderAmountTotal, productCount }
//     let addressInfo = { receiverName: result.date.receiverName, receiverAddress: result.date.receiverAddress, receiverMobile: result.date.receiverMobile }

//     return { orderInfo: result.date, list, addressInfo }
// }
// // 提交退款申请
// const applyDrawback = async ({ id, description, imgUrlList, type }) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/order/refund`
//     const result = await post(url, { id, description, imgUrlList, type }, { skey })
//     return result
// }
// // 获取售后列表
// const getAfterSaleList = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + '/innobeautylocal/order/refund/list'
//     const result = await post(url, params, { skey })
//     return result
// }
// //获取售后详情
// const getApplyInfo = async ({ id }) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/order/refund/${id}`
//     const result = await get(url, { skey })
//     return result
// }
// // 取消退款申请
// const cancelReturn = async ({ id, type }) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/order/refund/${id}`
//     const result = await requestDelete(url, { id, type }, { skey })
//     return result
// }
// // 通过快递单号获取物流公司
// const getExpressCompany = async (expressNo) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/order/logistics/number?expressNo=${expressNo}`
//     const result = await get(url, { skey })
//     return result
// }
// // 退货后填写物流信息
// const returnLogistics = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/order/refund/logistics`
//     const result = await post(url, params, { skey })
//     return result
// }
// // 提交投诉单
// const addComplaint = async (params) => {
//     const cookie = getFromStorage('cookie')
//     const url = baseUrl + `/innobeautylocal/order/complaint`
//     const result = await post(url, params, { cookie, 'content-type': 'application/json' })
//     return result
// }
// // 支付接口，获取参数
// const getPayParams = async ({ orderId, code }) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/pay`
//     const result = await post(url, { orderId, code, payChannelType: 'WX_MINI' }, { skey })
//     return result
// }

// const logout = async () => {
//     const cookie = getFromStorage('cookie')
//     const url = baseUrl + `/innobeautylocal/auth/logout`
//     const result = await get(url, { cookie })
//     return result
// }
// //代理中心
// //获取我的个人信息
// const getPersonalInfo = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/personal/info`
//     const result = await get(url, { skey })
//     return result
// }
// const agentApply = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/apply`
//     const result = await post(url, params, { skey })
//     return result
// }

// const failConfirm = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/apply/cancel`
//     const result = await get(url, { skey })
//     return result
// }
// // 代理商团队管理列表

// const getAgentTeam = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agents/level`
//     const result = await post(url, params, { skey })
//     return result
// }

// const getAgentInfo = async (id) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/${id}`
//     const result = await get(url, { skey })
//     return result
// }
// const getAgentInfoDatum = async (id) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/info/${id}`
//     const result = await get(url, { skey })
//     return result
// }
// const modifyAgentInfoDatum = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/info`
//     const result = await post(url, params, { skey })
//     return result
// }
// // 代理商充值接口
// const agentRecharge = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/recharge`
//     const result = await post(url, params, { skey })
//     return result
// }
// // 代理商获取充值记录列表
// const getRechargeRecordList = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/recharge/record`
//     const result = await post(url, params, { skey })
//     return result
// }
// // 充值记录详情
// const getRechargeDetail = async (id) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/recharge/record/${id}`
//     const result = await get(url, { skey })
//     return result
// }
// // 删除充值记录
// const deleteRechargeRecord = async (userId) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/recharge/record/${userId}`
//     const result = await requestDelete(url, {}, { skey })
//     return result
// }
// // 代理商-充值审核列表
// const getRechargeAuditList = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/recharge/auditList`
//     const result = await post(url, params, { skey })
//     return result
// }
// // 代理商-充值审核详情
// const getRechargeAuditInfo = async (id) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/recharge/auditInfo/${id}`
//     const result = await get(url, { skey })
//     return result
// }
// const agentAudit = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/recharge/agentAudit`
//     const result = await post(url, params, { skey })
//     return result
// }
// const getAgentFundsInfoList = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/recharge/agentFundsInfoList`
//     const result = await post(url, params, { skey })
//     return result
// }
// // 代理中心获取余额，费率，积
// const agentCenterInfo = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agency/center/info`
//     const result = await get(url, { skey })
//     return result
// }
// // 汇款充值申请
// const agentRemitApply = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/recharge/apply`
//     const result = await post(url, params, { skey })
//     return result
// }
// // 查询我的余额
// const getAgentFund = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/funds`
//     const result = await get(url, { skey })
//     return result
// }
// // 使用余额支付订单
// const payWithBanlance = async (orderId) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/balance/pay`
//     const result = await post(url, { orderId }, { skey })
//     return result
// }
// // 获取积分列表
// const getIntegralList = async (params) => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/integrals`
//     const result = await post(url, params, { skey })
//     return result
// }
// // 获取积分数目
// const getCurrentIntegral = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/integral`
//     const result = await get(url, { skey })
//     return result
// }
// // 获取待充值审核数目
// const getAuditCount = async () => {
//     const skey = getFromStorage('skey')
//     const url = baseUrl + `/innobeautylocal/agent/recharge/auditCount`
//     const result = await get(url, { skey })
//     return result
// }
// module.exports = {
//     upload,
//     getBannerList,
//     getIndexList,
//     getIndexMaterial,
//     getUserInfo,
//     getProductInfo,
//     getCartNumber,
//     addToCart,
//     cartOneUpdate,
//     deleteFromCart,
//     getCartList,
//     cartSelectAllToggle,
//     getUserAddressList,
//     delAddress,
//     addAddress,
//     addOrder,
//     freightCalc,
//     getOrderList,
//     cancelOrder,
//     deleteOrder,
//     confirmReceipt,
//     getOrderInfo,
//     applyDrawback,
//     getAfterSaleList,
//     getApplyInfo,
//     cancelReturn,
//     returnLogistics,
//     addComplaint,
//     getPayParams,
//     logout,
//     getExpressCompany,
//     agentApply,
//     getOrderCount,
//     failConfirm,
//     getPersonalInfo,
//     getAgentTeam,
//     getAgentInfo,
//     getAgentInfoDatum,
//     modifyAgentInfoDatum,
//     agentRecharge,
//     getRechargeRecordList,
//     getRechargeDetail,
//     deleteRechargeRecord,
//     getRechargeAuditList,
//     getRechargeAuditInfo,
//     agentAudit,
//     getAgentFundsInfoList,
//     agentCenterInfo,
//     agentRemitApply,
//     getAgentFund,
//     payWithBanlance,
//     getIntegralList,
//     getCurrentIntegral,
//     getIntegralRights,
//     getAuditCount
// }