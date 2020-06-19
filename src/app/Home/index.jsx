/*eslint-disable */
import React, { Component } from 'react';
import '../../../public/reset/reset.css';
import {
    HashRouter,
    BrowserRouter,
    MemoryRouter,
    StaticRouter,
    Switch,
    Route,
} from 'react-router-dom';
import { Flex } from 'antd-mobile';
import { connect } from 'react-redux';
import './index.less';
import Config from '../../../config/config';
import Contents from './Content';
import {Tools} from '../../util/index';
import hotJson from '../Index/Json/hotJson'
import shopCodeJson from '../Index/Json/shopCode';
import brandJson from '../Index/Json/brandData';

const { routeType } = Config;

class Home extends Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    /**
     * 判断使用的路由方式
     */
    _getRouteType() {
        switch (routeType) {
            case 'browser':
                return BrowserRouter;
            case 'memory':
                return MemoryRouter;
            case 'static':
                return StaticRouter;
            default:
                return HashRouter;
        }
    }

    initBrandData=(cityName)=>{
        let brandList = [];
        brandJson.forEach((ele)=>{
            if(ele.allCountry==='是' && ele.notInCitys===''){
                brandList.push(ele);
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
                    brandList.push(ele);
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
                    brandList.push(ele);
                }
            }
        })
        brandList.forEach((ele,index)=>{
            ele.noStr ='NO:'+(1111+index);
        })
        return brandList;
    }

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

    initCityJson=()=>{
        let shopCodeList = [];
        Object.keys(shopCodeJson).forEach((ele)=>{
            let obj = shopCodeJson[ele];
            obj.city = ele;
            shopCodeList.push(obj);
        })
        return shopCodeList;
    }
    

    componentWillReceiveProps(nextProps){
        if(((nextProps.cityName+'').indexOf(this.props.cityName+'')===-1)){
            let shopCode = '';
            let shopCodeList = this.initCityJson();
            shopCodeList.forEach((ele)=>{
                if(nextProps.cityName.indexOf(ele.city)!==-1){
                    shopCode = ele.shopCode;
                }
            })
            let skuListStr = this.initJsonData(nextProps.cityName);
            let cityBrandList = this.initBrandData(nextProps.cityName);
            console.log(nextProps.cityName+'所有品牌个数：',cityBrandList.length);
            this.props.setCityBrandList(cityBrandList);
            this.props.asyncGetSkuList({shopCode:shopCode,sapSkuCodes:skuListStr});
        }
    }


    componentDidMount(){
        const {cityName} = this.props;
        let skuListStr = this.initJsonData(cityName);
        let shopCode = '';
        let shopCodeList = this.initCityJson();
        shopCodeList.forEach((ele)=>{
            if(cityName.indexOf(ele.city)!==-1){
                shopCode = ele.shopCode;
            }
        })
        this.props.asyncGetSkuList({shopCode:shopCode,sapSkuCodes:skuListStr});
        let cityBrandList = this.initBrandData(cityName);
        this.props.setCityBrandList(cityBrandList);
        Tools.getLocationFun((obj)=>{
            this.props.asyncGetCityTarget({
                latitude:obj.latitude,
                longitude:obj.longitude
            })
        })
    }

    render() {
        const RouterType = this._getRouteType();
        return (
            <div>
                <RouterType>
                    <Switch>
                        <Route render={() => {
                            return (
                                <Flex>
                                    <Flex.Item>
                                        <Contents />
                                    </Flex.Item>
                                </Flex>
                            );
                        }}
                        />
                    </Switch>
                </RouterType>
                <div id="mapContainer"></div> 
            </div>
           
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        asyncGetCityTarget:dispatch.common.asyncGetCityTarget,
        asyncGetSkuList:dispatch.common.asyncGetSkuList,
        setCityBrandList:dispatch.common.setCityBrandList,
    };
};

const mapState = (state) => {
    return {
        cityName: state.common.cityName,
    };
};
export default connect(mapState, mapDispatch)(Home);
