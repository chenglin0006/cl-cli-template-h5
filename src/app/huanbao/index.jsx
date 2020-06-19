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
import ArrowRight from './images/arrow.png';
import JiancaiImg1 from './images/02.png';
import JiancaiImg2 from './images/03.png';
import JiancaiImg3 from './images/04.png';
import JiancaiImg4 from './images/05.png';
import JiancaiImg5 from './images/06.png';
import JiazhuangImg from './images/jiazhuang.png';
import SuperImg from './images/super.png';
import Baokuan from './images/baokuan.png';
import Coupon from './images/coupon2.png';
import CouponImg from './images/coupon.png';
import NoCouponImg from './images/nocoupon.png';
import MoreImg from './images/more.png';
import PinpaiImg from './images/pinpai.png';
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
                meta[i].content = "百安居全案设计新系统 ——环保家装 尽享优惠 立刻扫码报名！"
                share_desc = meta[i].content;
            }
        }
        console.log(share_desc, '------');
        let env = Tools.getEnv();
        if(env === 'production'){
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?a78b35ecef23fb2507c2e9b6fa954c95";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
             })();
        }
        document.title = '定装修就选百安居';
        Tools.getWxData('huanbao');
        this.props.asyncGetTotalNumber().then((data)=>{
            this.setState({totalNum:data.result.data});
        });
        let endFlag = false
        if(new Date().getTime()>new Date('2020/05/06 23:59:59').getTime()){
            endFlag=true
        }
        this.setState({endFlag:endFlag})
    }

    render() {
        const {totalNum,endFlag,hasMore} = this.state;
        var {cityBrandList,cityName,qingmingHotList} = this.props;
        var brandList = [];
        for(var i=0;i<cityBrandList.length;i+=3){
            brandList.push(cityBrandList.slice(i,i+3));
        }

        //type:1=>商品 2=>品牌 3=>装修
        return (
            <div className={"huanbao-page "+(endFlag?"end":"")}>
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
                            <div className="go-btn" onClick={()=>{
                                _hmt.push(['_trackEvent', '立即报名','立即报名'])
                                this.props.history.push('/baokuan/signUp?submitTitle=环保家装活动首页&type=3&fromIndex=huanbao');
                            }}>
                            <span>立即报名</span>
                                <img src={ArrowRight}></img>
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
                            <img className="jian-cai" src={JiancaiImg1}></img>
                            <img className="jian-cai" src={JiancaiImg2}></img>
                            <img className="jian-cai" src={JiancaiImg3}></img>
                            <div className="hot-area">
                                <img className='jia-zhuang-coupon' src={Coupon} onClick={()=>{
                                    this.props.history.push('/baokuan/signUp?submitTitle=环保家装活动首页&type=3&fromIndex=huanbao');
                                }}/>
                                <img className="jia-zhuang" src={JiancaiImg4}></img>
                            </div>
                            <img className="gift" src={JiancaiImg5}></img>
                            <div className="fix-btn" onClick={()=>{
                                this.props.history.push('/baokuan/signUp?submitTitle=环保家装活动首页&type=3&fromIndex=huanbao');
                            }}>
                                <span>立即报名</span>
                                <img src={ArrowRight}></img>
                            </div>
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
        cityBrandList: state.common.cityBrandList,
        qingmingHotList: state.goldWeek.qingmingHotList,
    };
};

const mapDispatch = (dispatch) => {
    return {
        setCityName:dispatch.common.setCityName,
        asyncGetTotalNumber:dispatch.goldWeek.asyncGetTotalNumber,
    };
};

export default connect(mapState, mapDispatch)(Index);
