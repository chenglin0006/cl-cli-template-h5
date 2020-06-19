/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import PropTypes from 'prop-types';
import {Tools} from '../../util/index'
import { Picker } from 'antd-mobile';
import cityListData from '../Index/Json/cityJson'
import DownArrowImg from '../Index/images/down-arrow.png';
import HeadImg from './images/head.png';
import JiancaiImg from './images/jiancai.png';
import JiazhuangImg from './images/jiazhuang.png';
import GiftImg from './images/gift.png';
import Baokuan from './images/baokuan.png';
import CouponImg from './images/coupon.png';
import NoCouponImg from './images/nocoupon.png';
import MoreImg from './images/more.png';
import ArrowDown from './images/arrowdown.png';

window._hmt = window._hmt || [];

const CustomChildren = props =>{
    return <p align="middle" onClick={props.onClick}>{props.extra}<img src={DownArrowImg}></img></p>
} 

let timer;

class Index extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            endFlag:false,
            cityValue:[],
            hasChangeCity:false,
            hasMore:true
        };
    }

    componentDidMount() {
        var share_desc = '';
        var meta = document.getElementsByTagName('meta');
        for(var i in meta){
            if(typeof meta[i].name!="undefined"&&(meta[i].name.toLowerCase()=="description" || meta[i].name.toLowerCase()=="keywords")){
                meta[i].content = "前所未有，力度空前！购建材尽享一价到底，签家装尊享六重豪礼。装修就找百安居，扫码报名抢300元家装礼金，还有会员优惠券等你来领！"
                share_desc = meta[i].content;
            }
        }
        console.log(share_desc, '------');
        let env = Tools.getEnv();
        if(env === 'production'){
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?ef056c0a95027052fb6b6eecf58ca0ca";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
             })();
        }
        document.title = '踏青小长假，装修正当时';
        Tools.getWxData('qingming');
        this.props.asyncGetTotalNumber().then((data)=>{
            this.setState({totalNum:data.result.data});
        });
        let endFlag = false
        if(new Date().getTime()>new Date('2020/04/06 23:59:59').getTime()){
            endFlag=true
        }
        this.setState({endFlag:endFlag})
        this.props.asyncGetQingmingSkuList();
    }

    render() {
        const {totalNum,endFlag,hasMore} = this.state;
        var {cityBrandList,cityName,qingmingHotList} = this.props;
        var brandList = [];
        for(var i=0;i<cityBrandList.length;i+=3){
            brandList.push(cityBrandList.slice(i,i+3));
        }

        let selectCity = "";
        const cityEnum = []
        cityListData.forEach((ele,index)=>{
            cityEnum.push({
                label: ele,
                value: ele,
            })
        })
        cityEnum.forEach((ele)=>{
            if(cityName.indexOf(ele.value)>-1){
                selectCity = ele.value;
            }
        })

        const hotList = qingmingHotList || [];
        //type:1=>商品 2=>品牌 3=>装修
        return (
            <div className={"qingming-page "+(endFlag?"end":"")}>
                {
                    endFlag?<div className="end-div">活动已结束</div>:
                    <div className="activity-page-div">
                        {/* <div className="choose-city">
                            <Picker data={cityEnum} 
                            cols={1} 
                            value={[selectCity]} 
                            // {...getFieldProps('cityName', {
                            //     rules: [{ required: true, message: '请选择城市' }],
                            //     initialValue:this.state.sValue
                            // })}
                            onOk={v => 
                                {
                                    this.setState({hasChangeCity:true});
                                    this.props.setCityName(v[0])
                                }
                            } className="forss">
                                  <CustomChildren/>
                            </Picker>
                        </div> */}
                        <div className="head-div">
                            <img src={HeadImg}></img>
                        </div>
                        <div className="join-div" id="proMain">
                            <div className="number-div">
                                <div className="number-desc">已浏览人数</div>
                                <div className="number">{parseInt(totalNum*16.13+5000)}</div>
                            </div>
                            <div className="number-div">
                                <div className="number-desc">已报名人次</div>
                                <div className="number">{parseInt(totalNum*4.43+2000)}</div>
                            </div>
                            <div className="number-div">
                                <div className="number-desc">已分享人次</div>
                                <div className="number">{parseInt(totalNum*7.23+3000)}</div>
                            </div>
                            <div className="go-btn" onClick={()=>{
                                _hmt.push(['_trackEvent', '立即报名','立即报名'])
                                this.props.history.push('/baokuan/signUp?submitTitle=清明踏青活动首页&type=3&fromIndex=qingming');
                            }}>
                            <span>立即报名</span>
                                <img src="https://res1.bnq.com.cn/4dc5c30d-374d-450d-b51f-1274f74da3b8?t=1583939767697"></img>
                            </div>
                        </div>
                        <div className="imgs-div">
                            <img className="jian-cai" src={JiancaiImg}></img>
                            <img className="jia-zhuang" src={JiazhuangImg} onClick={()=>{
                                this.props.history.push('/baokuan/signUp?submitTitle=清明踏青活动首页&type=3&fromIndex=qingming');
                            }}></img>
                            <img className="gift" src={GiftImg}></img>
                            <img className="bao-kuan" src={Baokuan}></img>
                        </div>
                        <div className="sku-content">
                            <div className={"sku-list-div "+(hasMore&&hotList.length>3?"has-more":"no-more")}>
                                {
                                    hotList.map((detailData,index)=>{
                                        return  hasMore&&index>=3?null:<div  className="hot-item" key={detailData.sku} onClick={()=>{
                                                    if(detailData.count === 0){
                                                        this.props.history.push('/baokuan/detail?skuCode='+detailData.sku+'&shopCode='+detailData.shopCode+'&fromIndex=qingming'+'&couponOverFlag=over'+'&activityNo='+detailData.activityNo+'&price='+detailData.activityPrice);
                                                    } else {
                                                        this.props.history.push('/baokuan/detail?skuCode='+detailData.sku+'&shopCode='+detailData.shopCode+'&fromIndex=qingming'+'&activityNo='+detailData.activityNo+'&price='+detailData.activityPrice);
                                                    }
                                                        }}>
                                            <div className="img-div">
                                                {
                                                    detailData.listImg?<img src={detailData.listImg} />:null
                                                }
                                                
                                            </div>
                                            <div className="hot-content">
                                                    <div className="name">{detailData.itemName}</div>
                                                    <div className="price">
                                                        {
                                                            Tools.isNotNull(detailData.activityPrice)? <div className="now"><span>¥</span><span>{detailData.activityPrice}</span></div>:null
                                                        }
                                                        {
                                                            Tools.isNotNull(detailData.originalPrice)?<div className="before"><span>¥</span><span>{detailData.originalPrice}</span></div>:null
                                                        }
                                                        
                                                </div>
                                            </div>
                                            <div className="go-btn">
                                                <img src={detailData.count!==0?CouponImg:NoCouponImg}></img>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            {
                                hasMore&&hotList.length>3?<div className="sku-more-div">
                                    <div className="text" onClick={() => {
                                        this.setState({hasMore:false});
                                    }}>查看更多</div>
                                    <img src={ArrowDown}></img>
                                </div>:null
                            }
                            
                        </div>
                        <div className="desc-div">（同一个手机号，每款爆款商品仅限领取一张优惠券。）</div>
                        <div className="more-div">
                            <img src={MoreImg}></img>
                        </div>
                    </div> 
                    
                }
                
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        cityName: state.common.cityName,
        hotSkuList: state.common.hotSkuList,
        loading: state.loading.effects.common.asyncGetQingmingSkuList,
        cityBrandList: state.common.cityBrandList,
        qingmingHotList: state.qingming.qingmingHotList,
    };
};

const mapDispatch = (dispatch) => {
    return {
        setCityName:dispatch.common.setCityName,
        asyncGetTotalNumber:dispatch.qingming.asyncGetTotalNumber,
        asyncGetQingmingSkuList:dispatch.qingming.asyncGetQingmingSkuList,
    };
};

export default connect(mapState, mapDispatch)(Index);
