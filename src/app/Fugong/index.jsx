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
import SignUpImg from './images/signUp.png';
import JiazhuanggoImg from './images/jiazhuang-go.png'

window._hmt = window._hmt || [];

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
        var meta = document.getElementsByTagName('meta');
        var share_desc = '';
        for(var i in meta){
            if(typeof meta[i].name!="undefined"&&(meta[i].name.toLowerCase()=="description" || meta[i].name.toLowerCase()=="keywords")){
                meta[i].content = "10亿补贴惠全国，签家装尊享六重好礼，购建材力度再升级。扫码报名抢免费环保检测资格，仅限前500名。会员独享优惠券，还有300元家装礼金等你来领！"
                share_desc = meta[i].content;
            }
        }
        console.log(share_desc, '------');
        let env = Tools.getEnv();
        if(env === 'production'){
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?f91f15c7fa8446516ff02d7d56aa9d11";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
             })();
        }
        document.title = '装修复工第一战';
        Tools.getWxData('fugong');
        this.props.asyncGetTotalNumber().then((data)=>{
            this.setState({totalNum:data.result.data});
        });
        let endFlag = false
        if(new Date().getTime()>new Date('2020/04/20 23:59:59').getTime()){
            endFlag=true
        }
        this.setState({endFlag:endFlag})
        this.props.asyncGetSkuList();
    }

    render() {
        const {totalNum,endFlag,hasMore} = this.state;
        var {hotList} = this.props;

        hotList&&hotList.forEach((ele) =>{
            if(ele.sku+'' === '4265959'){
                ele.itemName = "TCL王牌空调KFRD-35GW/ABP-XP11+A2"
                ele.listImg = "http://storage.bthome.com/activity/fugong/4265959-1.png"
            } else if (ele.sku+'' === '4265961') {
                ele.itemName = "TCL王牌空调KFRD-35GW/F2AH11BPA"
                ele.listImg = "http://storage.bthome.com/activity/fugong/4265961-1.png"
            }
        })

        //type:1=>商品 2=>品牌 3=>装修
        return (
            <div className={"fugong-page "+(endFlag?"end":"")}>
                {
                    endFlag?<div className="end-div">活动已结束</div>:
                    <div className="activity-page-div">
                        <div className="head-div">
                            <img src={HeadImg}></img>
                        </div>
                        <div style={{display:'none'}} onClick={() => {
                            console.log('test');
                                var mess=JSON.stringify({BotMainExternal:{Cooper_CRM_OutCall:{telephone:"02867645575",version:"1.0.0"}}});
                                window.parent.postMessage(mess, "*");
                            }}>不在iframe</div>
                        <div className="join-div" id="proMain">
                            <div>
                                <img src={SignUpImg} onClick={()=>{
                                _hmt.push(['_trackEvent', '立即报名','立即报名'])
                                this.props.history.push('/signUp?submitTitle=家装复工第一站首页&type=3&fromIndex=fugong');
                            }}></img>
                            </div>
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
                        </div>
                        <div className="imgs-div">
                            <img className="jian-cai" src={JiancaiImg}></img>
                            <div className="jiazhuang-img">
                                <img className="jia-zhuang" src={JiazhuangImg}></img>
                                <img className="jia-zhuang-go"  onClick={()=>{
                                    this.props.history.push('/signUp?submitTitle=家装复工第一站首页&type=3&fromIndex=fugong');
                                }} src={JiazhuanggoImg}></img>
                            </div>
                            <img className="bao-kuan" src={Baokuan}></img>
                        </div>
                        <div className="sku-content">
                            <div className={"sku-list-div "+(hasMore&&hotList.length>3?"has-more":"no-more")}>
                                {
                                    hotList.map((detailData,index)=>{
                                        return  hasMore&&index>=3?null:<div  className="hot-item" key={detailData.sku} onClick={()=>{
                                                    if(detailData.count === 0){
                                                        this.props.history.push('/baokuan/detail?skuCode='+detailData.sku+'&shopCode='+detailData.shopCode+'&fromIndex=fugong'+'&couponOverFlag=over'+'&activityNo='+detailData.activityNo+'&price='+detailData.activityPrice);
                                                    } else {
                                                        this.props.history.push('/baokuan/detail?skuCode='+detailData.sku+'&shopCode='+detailData.shopCode+'&fromIndex=fugong'+'&activityNo='+detailData.activityNo+'&price='+detailData.activityPrice);
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
        loading: state.loading.effects.fugong.asyncGetSkuList,
        hotList: state.fugong.hotList,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncGetTotalNumber:dispatch.fugong.asyncGetTotalNumber,
        asyncGetSkuList:dispatch.fugong.asyncGetSkuList,
    };
};

export default connect(mapState, mapDispatch)(Index);
