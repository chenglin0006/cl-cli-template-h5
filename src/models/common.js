/* eslint-disable */
import CommonService from '../service/CommonService';
import {Tools} from '../util/index';
import hotJson from '../app/Index/Json/hotJson';

const CommonServices = new CommonService();

export default {
    state: {
        cityName: '上海',
        hotSkuList: [],
        activeBrandType: "墙地面装饰",
        cityBrandList: [],
        hotErrorInfo:{}
    },
    reducers: {
        setCityName(state, data) {
            return {
                ...state,
                cityName: data,
            };
        },
        setHotSkuList(state, data) {
            return {
                ...state,
                hotSkuList: data,
            };
        },
        setActiveBrandType(state, data) {
            return {
                ...state,
                activeBrandType: data,
            };
        },
        setCityBrandList(state, data) {
            return {
                ...state,
                cityBrandList: data,
            };
        },
        setHotErrorInfo(state, data) {
            return {
                ...state,
                hotErrorInfo: data,
            };
        }
    },
    effects: {
        async asyncGetSkuList(params) {
            const skuParams = (`${params.sapSkuCodes}`).split(',');
            params.pageSize = skuParams.length;
            params.curPage = 1;
            const resp = await CommonServices.getSkuList(params);
            const respData = resp.result.data;
            let skuObj = {}
            let noInfo = [];
            skuParams.forEach((s) => {
                let list = [];
                respData.forEach((ele, index) => {
                    ele.skuDtoList.forEach((i) => {
                        if (i.sapSkuNo && s &&`${i.sapSkuNo}` === `${s}`) {
                            list.push(Tools.deepClone(ele));
                        }
                    });
                });
                if(list.length>0){
                    list[0].sapSkuNoFlag = s;
                    skuObj[s]=list[0];
                } else {
                    console.log('没有返回信息的商品:',s);
                    noInfo.push(s);
                }
            });
            const arr = [];
            // Object.keys(skuObj).forEach((ele)=>{
            //     arr.push(skuObj[ele]);
            // })
            skuParams.forEach((ele)=>{
                if(skuObj[ele]){
                    arr.push(skuObj[ele]);
                }
            })
            var data = [];
            var obj = {};
            var reapeatData=[];
            for(var i =0; i<arr.length; i++){
                if(!obj[arr[i].id]){
                    data.push(arr[i]);
                    obj[arr[i].id] = true;
                } else {
                    reapeatData.push(arr[i].id+'-'+arr[i].sapSkuNoFlag);
                    console.log('重复了的商品:',arr[i].id+'-'+arr[i].sapSkuNoFlag);
                }
            }
            hotJson.forEach((ele)=>{
                data.forEach((i)=>{
                    if(ele.sku&&ele.sku === i.sapSkuNoFlag){
                        i.nowPrice = ele.activityPrice;
                        i.beforePrice = ele.realPrice;
                    }
                })
            })
            console.log('skuParams.length------',skuParams.length);
            console.log('没有获取信息的个数------',noInfo.length);
            console.log('重复了的个数------',reapeatData.length);
            console.log('最后获取sku的个数------',data.length);
            console.log(skuParams,data);
            // this.setHotErrorInfo(objError);
            this.setHotSkuList(data);
            return data;
        },
        async asyncGetSkuListByCity(params) {
            const skuParams = (`${params.sapSkuCodes}`).split(',');
            params.pageSize = skuParams.length;
            params.curPage = 1;
            const resp = await CommonServices.getSkuList(params);
            const respData = resp.result.data;
            let skuObj = {}
            let noInfo = [];
            skuParams.forEach((s) => {
                let list = [];
                respData.forEach((ele, index) => {
                    ele.skuDtoList.forEach((i) => {
                        if (i.sapSkuNo && s &&`${i.sapSkuNo}` === `${s}`) {
                            list.push(Tools.deepClone(ele));
                        }
                    });
                });
                if(list.length>0){
                    list[0].sapSkuNoFlag = s;
                    skuObj[s]=list[0];
                } else {
                    console.log('没有返回信息的商品:',s);
                    noInfo.push(s);
                }
            });
            const arr = [];
            // Object.keys(skuObj).forEach((ele)=>{
            //     arr.push(skuObj[ele]);
            // })
            skuParams.forEach((ele)=>{
                if(skuObj[ele]){
                    arr.push(skuObj[ele]);
                }
            })
            var data = [];
            var obj = {};
            var reapeatData=[];
            for(var i =0; i<arr.length; i++){
                if(!obj[arr[i].id]){
                    data.push(arr[i]);
                    obj[arr[i].id] = true;
                } else {
                    reapeatData.push(arr[i].id+'-'+arr[i].sapSkuNoFlag);
                    console.log('重复了的商品:',arr[i].id+'-'+arr[i].sapSkuNoFlag);
                }
            }
            hotJson.forEach((ele)=>{
                data.forEach((i)=>{
                    if(ele.sku&&ele.sku === i.sapSkuNoFlag){
                        i.nowPrice = ele.activityPrice;
                        i.beforePrice = ele.realPrice;
                    }
                })
            })
            console.log('skuParams.length------',skuParams.length);
            console.log('没有获取信息的个数------',noInfo.length);
            console.log('重复了的个数------',reapeatData.length);
            console.log('最后获取sku的个数------',data.length);
            console.log(skuParams,data);
            let objError = {
                noInfo:noInfo,
                skuParams:skuParams,
                reapeatData:reapeatData,
                data:data
            }
            this.setHotErrorInfo(objError);
            return data;
        },
        async asyncSubmitUser(params) {
            const data = await CommonServices.submitUser(params);
            return data;
        },
        async asyncGetCityTarget(params) {
            const res = await CommonServices.getCityTarget(params);
            this.setCityName(res.response.data.locCityName);
            return res;
        },
    },
};
