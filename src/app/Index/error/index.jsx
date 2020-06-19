/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Tools} from '../../../util/index';
import shopCodeJson from '../Json/shopCode';
import hotJson from '../Json/hotJson';

class Detail extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    initJsonData = (cityName)=>{
        let hotSkuList = [];
        hotJson.forEach((ele)=>{
            if(ele.allCountry==='是' && ele.notInCitys===''){
                hotSkuList.push(ele);
            } else if(ele.allCountry==='是' && ele.notInCitys){
                let notInCityList = ele.notInCitys.split(',');
                //当前城市不包含在notInCitys里面
                let hasFlag=false;
                notInCityList.forEach((i)=>{
                    if(cityName.indexOf(i)>-1 || i.indexOf(cityName)>-1){
                        hasFlag = true;
                    }
                })
                if(!hasFlag){
                    hotSkuList.push(ele);
                }
            } else if(ele.citys){
                let cityList = ele.citys.split(',');
                let hasFlag=false;
                cityList.forEach((i)=>{
                    if(cityName.indexOf(i)>-1 || i.indexOf(cityName)>-1){
                        hasFlag = true;
                    }
                })
                if(hasFlag){
                    hotSkuList.push(ele);
                }
            }
        })
        let skuList = [];
        hotSkuList.forEach((ele)=>{
            if(ele.sku){
                skuList.push(ele.sku);
            }
        })
        return skuList.join(',')
    }

    componentDidMount() {
        let cityName  = Tools.getUrlArg('cityName') && decodeURIComponent(Tools.getUrlArg('cityName')) || '上海';
        let shopCode = shopCodeJson[cityName].shopCode;
        let skuListStr = this.initJsonData(cityName);
        this.props.asyncGetSkuListByCity({shopCode:shopCode,sapSkuCodes:skuListStr})
    }

    render() {
        let {hotErrorInfo} = this.props
        return (
           <div>
               {
                   hotErrorInfo?<div style={{wordBreak:'break-all'}}>
                    <div> 查询的sku：{hotErrorInfo.skuParams&&hotErrorInfo.skuParams.join(',')} </div>
                    <div> 查询的sku长度：{hotErrorInfo.skuParams&&hotErrorInfo.skuParams.length} </div>
                    <div> 没有获取信息的sku：{hotErrorInfo.noInfo&&hotErrorInfo.noInfo.join(',')} </div>
                    <div> 没有获取信息的个数：{hotErrorInfo.noInfo&&hotErrorInfo.noInfo.length} </div>
                    <div> 重复的商品：{hotErrorInfo.reapeatData&&hotErrorInfo.reapeatData.join(',')} </div>
                    <div> 重复的商品个数：{hotErrorInfo.reapeatData&&hotErrorInfo.reapeatData.length} </div>
                    <div> 最终的数据个数{hotErrorInfo.data&&hotErrorInfo.data.length} </div>
                   </div>:null
               }
               
           </div>
        );
    }
}

const mapState = (state) => {
    return {
        hotErrorInfo: state.common.hotErrorInfo,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncGetSkuListByCity:dispatch.common.asyncGetSkuListByCity
    };
};

export default connect(mapState, mapDispatch)(Detail);
