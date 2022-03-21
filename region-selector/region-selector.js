const { queryProvinceList, queryCityList, queryCountryList } = require('../utils/api')
Component({
  behaviors: [],
  properties: {
    selectedOptions: {
      type: Array,
      value: []
    },
    onCancelPick: {
      type: Function, value: () => { }
    },
    onConfirmPick: {
      type: Function, value: () => { }
    }
  },
  data: {
    provinceList: [],
    cityList: [],
    countryList: [],
    disList: []
  },
  lifetimes: {
    async created() {
      await this.queryProvice()
      const pCode = this.data.provinceList[0].code
      await this.queryCity(pCode)
      const cCode = this.data.cityList[0].code
      await this.queryCountry(cCode)
    },
    attached() {

    },
    moved() {

    },
    detached() {

    },
  },
  methods: {
    cancelPick(e) {
      this.triggerEvent('cancelPick', e)
    },
    confirmPick(e) {
      const indexs = e.detail.index
      const province = this.data.provinceList[indexs[0]]
      const city = this.data.cityList[indexs[1]]
      const country = this.data.countryList[indexs[2]]
      e._values = {
        province,
        city,
        country
      }
      this.triggerEvent('confirmPick', e)
    },
    async onChangePickVal(e) {
      const { picker, value, index } = e.detail;
      if (index == 0) {
        const provinceName = e.detail.value[0]
        const provinceCode = this.data.provinceList.find(e => e.name == provinceName).code
        await this.queryCity(provinceCode)
        const cCode = this.data.cityList[0].code
        await this.queryCountry(cCode)
      } else if (index == 1) {
        const cityName = e.detail.value[1]
        const cityCode = this.data.cityList.find(e => e.name == cityName).code
        this.queryCountry(cityCode)
      }
    },
    async queryProvice() {
      const resP = await queryProvinceList()
      if (resP.state == 200) {
        // this.roleList = res.data
        this.setData({
          provinceList: resP.data,
          disList: [
            {
              values: resP.data.map(e => e.name)
            }
          ]
        })
      }
    },
    async queryCity(provinceCode) {
      const res = await queryCityList(provinceCode)
      if (res.state == 200) {
        // this.roleList = res.data
        const disList = this.data.disList
        if (res.data && res.data.length) {
          disList[1] = {
            values: res.data.map(e => e.name)
          }
        } else {
          disList[1] = {
            values: []
          }
        }
        this.setData({
          cityList: res.data || [],
          disList,
          pickList: disList
        })
      }
    },
    async queryCountry(cityCode) {
      const res = await queryCountryList(cityCode)
      if (res.state == 200) {
        // this.roleList = res.data
        const disList = this.data.disList
        if (res.data && res.data.length) {
          disList[2] = {
            values: res.data.map(e => e.name)
          }
        } else {
          disList[2] = {
            values: []
          }
        }

        this.setData({
          countryList: res.data || [],
          disList,
          pickList: disList
        })
      }
    },
  },
});