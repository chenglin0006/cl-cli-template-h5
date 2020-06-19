/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import PropTypes from 'prop-types';
import YcLogo from './images/yuanchuang.png';
import JzLogo from './images/jiazhuang.png';
import VrLogo from './images/vr.png';
import FsLogo from './images/fengshui.png';
import HeadImg from './images/head.png';
import FengbaoImg from './images/fengbao.png';
import FengbaoImg76 from './images/76.png';
import FengbaoImg85 from './images/85.png';
import loadingGif from './images/loading-change.gif'
import HotItem from './components/hotItem/index'
import {Tools} from '../../util/index'
import { Picker } from 'antd-mobile';
import cityListData from './Json/cityJson'
import DownArrowImg from './images/down-arrow.png';

const CustomChildren = props =>{
    console.log(props,'------');
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
            hasChangeCity:false
        };
    }

    componentWillMount() {
        document.title = '百安居首届全国在线家博会';
    }

    componentWillUnmount(){
        clearInterval(timer);
    }

    componentDidMount() {
        Tools.getWxData();
        this.props.asyncGetTotalNumber().then((data)=>{
            this.setState({totalNum:data.result.data});
        });
        let endFlag = false
        if(new Date().getTime()>new Date('2020/03/31 23:59:59').getTime()){
            endFlag=true
        }
        this.setState({endFlag:endFlag})
    }

    render() {
        const {totalNum,endFlag,hasChangeCity} = this.state;
        var {hotSkuList,loading,cityBrandList,cityName} = this.props;
        var brandList = [];
        for(var i=0;i<cityBrandList.length;i+=3){
            brandList.push(cityBrandList.slice(i,i+3));
        }
        const tagList = [{
            id: 'jiazhuang',
            name: '家装全案设计',
            mainPic: JzLogo,
        }, {
            id: 'yuanchuang',
            name: '原创设计展',
            mainPic: YcLogo,
        }, {
            id: 'vr',
            name: 'VR体验',
            mainPic: VrLogo,
        }, {
            id: 'fengshui',
            name: '家居风水',
            mainPic: FsLogo,
        }, {
            id: 'pinpai',
            name: '品牌展馆',
        }, {
            id: 'baopin',
            name: '爆品秒杀',
        }];

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
        //type:1=>商品 2=>品牌 3=>装修
        return (
            <div className={"index-page "+(endFlag?"end":"")}>
                {
                    endFlag?<div className="end-div">活动已结束</div>:
                    <div className="activity-page-div">
                        <div className="choose-city">
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
                        </div>
                        <div className="head-div">
                            <img src={HeadImg}></img>
                        </div>
                        <div className="join-div" id="proMain">
                            <div className="go-btn" onClick={()=>{
                                this.props.history.push('/baokuan/signUp?submitTitle=百安居家博会首页&type=3');
                            }}>
                            <span>立即报名</span>
                                <img src="https://res1.bnq.com.cn/4dc5c30d-374d-450d-b51f-1274f74da3b8?t=1583939767697"></img>
                            </div>
                            <div className="number-div">
                                <div className="number-desc">已浏览人数</div>
                                <div className="number">{parseInt(totalNum*16.13+5000)}人</div>
                            </div>
                            <div className="number-div">
                                <div className="number-desc">已报名人次</div>
                                <div className="number">{parseInt(totalNum*6.43+2000)}人</div>
                            </div>
                            <div className="number-div">
                                <div className="number-desc">已分享人次</div>
                                <div className="number">{parseInt(totalNum*11.32+3000)}人</div>
                            </div>
                        </div>
                        <div className="activity-div">
                            <div className="main" onClick={()=>{
                                this.props.history.push('/jialiao');
                            }}>
                                <img src={FengbaoImg}></img>
                            </div>
                            {
                                brandList.length===0 && hotSkuList.length===0?null:<div className="activity-list">
                                    <div className="activity-item" onClick={()=>{
                                        this.props.history.push('/jialiao');
                                    }}>
                                        <img src={FengbaoImg76}></img>
                                    </div>
                                    <div className="activity-item" onClick={()=>{
                                        this.props.history.push('/jialiao');
                                    }}>
                                        <img src={FengbaoImg85}></img>
                                    </div>
                                    
                                </div>
                            }
                        </div>
                        <div className="tag-div">
                            {
                                tagList.map((ele,index) => {
                                    if(ele.id=='pinpai'){
                                        if(brandList.length){
                                            return <a href={`#${ele.id}`} key={ele.id} className={"tag-item "+"item-"+index}>
                                                {ele.name}
                                            </a>;
                                        } else {
                                            return null;
                                        }
                                    } else if (ele.id === 'baopin'){
                                        if(hotSkuList.length || loading){
                                            return <a href={`#${ele.id}`} key={ele.id}  className={"tag-item "+"item-"+index}>
                                                {ele.name}
                                            </a>;
                                        } else {
                                            return null
                                        }
                                    } else {
                                        return <a href={`#${ele.id}`} key={ele.id}  className={"tag-item "+"item-"+index}>
                                            {ele.name}
                                        </a>;
                                    }
                                })
                            }
                        </div>
                        <div className="main-content">
                            <div className="tag-main-pic-list">
                                {
                                    tagList.map((ele) => {
                                        if(ele.mainPic){
                                            return <div
                                                id={`${ele.id}`}
                                                key={ele.id}
                                                onClick={() => {
                                                    if (ele.id === 'vr') {
                                                        this.props.history.push(`/vrdetail`);
                                                    } else if (ele.id === 'jiazhuang') {
                                                        this.props.history.push(`/jiazhuangdetail`);
                                                    } else if (ele.id === 'fengshui') {
                                                        this.props.history.push(`/fengshuidetail`);
                                                    } else if (ele.id === 'yuanchuang') {
                                                        this.props.history.push(`/yuanchuangdetail`);
                                                    }
                                                }}
                                                className="tag-pic-item"
                                            >
                                                <img src={ele.mainPic} alt="" />
                                            </div>;
                                        } else {
                                            return null
                                        }
                                        
                                    })
                                }
                            </div>
                            {
                                brandList.length>0? <div id="pinpai" className="brand-type type-div" >
                                    <div className="type-title">
                                        <div className="type-name">品牌展馆</div>
                                        {
                                            brandList.length>5?<div className="more-div"  onClick={()=>{
                                                this.props.history.push(`/brand`);
                                            }}><span>查看更多</span><img src="https://res1.bnq.com.cn/4dc5c30d-374d-450d-b51f-1274f74da3b8?t=1583939767697"></img></div>:null
                                        }
                                    </div>
                                    <div className="list-content">
                                        {brandList.map((i,index)=>{
                                            return index>=5?null:<div className="brand-line" key={index}>
                                                {
                                                    i.map((ele)=>{
                                                        return <div className="brand-item" key={ele.brand} onClick={()=>{
                                                            this.props.history.push(`/brand/detail/`+ele.brand);
                                                        }}>
                                                            <div className="no-div">{ele.noStr}</div>
                                                            <div className="img-div">
                                                                {ele.logo?<img key={index} src={ele.logo.split(',')[0]} />:null}
                                                            </div>
                                                            <div className="brand-name">{ele.brand}</div>
                                                        </div>
                                                    })  
                                                }
                                            </div>
                                        })}
                                    </div>
                                </div>:null
                            }
                            {
                                hotSkuList.length>0?<div id="baopin" className="type-div hot-type">
                                    <div className="type-title">
                                        <div className="type-name">爆品秒杀</div>
                                        {
                                            hotSkuList.length>4?<div className="more-div"  onClick={()=>{
                                                this.props.history.push(`/baoKuan`);
                                            }}><span>查看更多</span><img src="https://res1.bnq.com.cn/4dc5c30d-374d-450d-b51f-1274f74da3b8?t=1583939767697"></img></div>:null
                                        }
                                    </div>
                                    <div className="hot-list">
                                        {
                                            hotSkuList.map((ele, index)=>{
                                                return index>=4?null:<HotItem history={this.props.history} key={index} detailData={ele}></HotItem>
                                            })
                                        }
                                    </div>
                                </div>:null
                            }
                            {
                                 loading&&hasChangeCity?<div className="loading-change-div">
                                    <img src={loadingGif}></img>
                                    <div className="text">切换城市会场中</div>
                                </div>:null
                            }
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
        loading: state.loading.effects.common.asyncGetSkuList,
        cityBrandList: state.common.cityBrandList,
    };
};

const mapDispatch = (dispatch) => {
    return {
        setCityName:dispatch.common.setCityName,
        asyncGetTotalNumber:dispatch.homeIndex.asyncGetTotalNumber,
    };
};

export default connect(mapState, mapDispatch)(Index);
