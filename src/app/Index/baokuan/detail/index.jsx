/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.less';
import { Carousel, WingBlank } from 'antd-mobile';
import { Tools } from '../../../../util/index.js';
import loadingGif from '../../images/loading.gif';
import {Toast} from 'antd-mobile';

// import DetailPage from '../components/detail';
let sapSkuNo;

class BaokuanDetail extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            fromIndex:Tools.getUrlArg('fromIndex'),
            activityNo:Tools.getUrlArg('activityNo'),
            couponOverFlag:Tools.getUrlArg('couponOverFlag'),
            price:Tools.getUrlArg('price'),
        };
    }

    componentDidMount() {
        let fromIndex = Tools.getUrlArg('fromIndex');
        if(fromIndex=='qingming'){
            document.title = '爆款领券';
            Tools.getWxData('qingming');
        } else if(fromIndex=='fugong'){
            document.title = '爆款领券';
            Tools.getWxData('fugong');
        } else if(fromIndex=='goldWeek'){
            document.title = '爆款领券';
            Tools.getWxData('goldWeek');
        } else if(fromIndex=='niujiang'){
            document.title = '商品详情';
        } else {
            document.title = '爆款秒杀';
            Tools.getWxData();
        }
        
        sapSkuNo = Tools.getUrlArg('skuCode');
        let shopCode = Tools.getUrlArg('shopCode');

        if(sapSkuNo+'' ==='4265959'  ||  sapSkuNo+''==='4265961' ||  sapSkuNo+''==='4266300' ||  sapSkuNo+''==='4262908'){
            this.setState({});
        } else {
            this.props.asyncGetBaokuanDetail({
                sapSkuNo,
                shopCode
            })
        }
        document.body.scrollTop=document.documentElement.scrollTop=0;
    }

    componentWillUnmount() {
    }

    _getCoupon=()=>{
        const {asyncGetCoupon} = this.props;
        const {activityNo,fromIndex} = this.state;
        let sessionToken = "";
        if(fromIndex === 'qingming'){
            sessionToken = sessionStorage.getItem('qingMingLoginToken');
        } else if(fromIndex === 'fugong'){
            sessionToken = sessionStorage.getItem('fugongLoginToken');
        } else if(fromIndex === 'goldWeek'){
            sessionToken = sessionStorage.getItem('goldWeekLoginToken');
        }
        if(sessionToken){
            let params = {
                activityNo:activityNo,
                sessionToken: sessionToken,
            }
            asyncGetCoupon(params).then((data) => {
                console.log(data);
                let typeMeta = data.code;
                if(typeMeta === 1){
                    this.props.history.push('/coupon5/success?fromIndex='+fromIndex);
                } else if(typeMeta === 2){
                    Toast.fail('您已领取过相关优惠券',2);
                } else if (typeMeta === 3){
                    Toast.fail('该优惠券已经没啦 ',2);
                } 
            }).catch((error) => {
                Toast.fail(error.reason);
            })
        } else {
            this.props.history.push('/login?sapSkuNo='+sapSkuNo+'&activityNo='+activityNo+'&fromIndex='+fromIndex);
        }
    }

    render() {
        const { loading } = this.props;
        const {fromIndex, couponOverFlag,price} = this.state;
        let detailInfo = this.props.detailInfo;
        if(sapSkuNo&&sapSkuNo+'' === '4265959'){
            detailInfo = {
                itemName: 'TCL王牌空调KFRD-35GW/ABP-XP11+A2',
                mainImgList:[
                    {url:'http://storage.bthome.com/activity/fugong/4265959-1.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-2.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-3.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-4.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-5.png'},
                ],
                detailImgList: [
                    {url:'http://storage.bthome.com/activity/fugong/4265959-xq_01.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-xq_02.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-xq_03.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-xq_04.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-xq_05.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-xq_06.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-xq_07.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265959-xq_08.png'},
                ],
            }
        }
        if(sapSkuNo&&sapSkuNo+'' === '4265961'){
            detailInfo = {
                itemName: 'TCL王牌空调KFRD-35GW/F2AH11BPA',
                mainImgList:[
                    {url:'http://storage.bthome.com/activity/fugong/4265961-1.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-2.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-3.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-4.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-5.png'},
                ],
                detailImgList: [
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_01.jpg'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_02.jpg'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_03.jpg'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_04.jpg'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_05.jpg'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_06.jpg'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_07.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_08.jpg'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_09.png'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_10.jpg'},
                    {url:'http://storage.bthome.com/activity/fugong/4265961-xq_11.png'},
                ],
            }
        }
        if(sapSkuNo&&sapSkuNo+'' === '4266300'){
            detailInfo = {
                itemName: '霍尼韦尔空气净化器KJ900F-PAC000CW',
                mainImgList:[
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-fm1.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-fm2.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-fm3.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-fm4.png'},
                ],
                detailImgList: [
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq1.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq2.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq3.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq4.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq5.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq6.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq7.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq8.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq9.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq10.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq11.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq12.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq13.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq14.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq15.png'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4266300-xq16.png'},
                ],
            }
        }

        if(sapSkuNo&&sapSkuNo+'' === '4262908'){
            detailInfo = {
                itemName: '飞利浦悦翼风扇灯24W+48W配遥控器',
                mainImgList:[
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4262908-fm1.jpg'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4262908-fm2.jpg'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4262908-fm3.jpg'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4262908-fm4.jpg'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4262908-fm5.jpg'},
                ],
                detailImgList: [
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4262908-xq1.jpg'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4262908-xq2.jpg'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4262908-xq3.jpg'},
                    {url:'http://storage.bthome.com/activity/huangjinzhou/4262908-xq4.jpg'},
                ],
            }
        }
        let mainImgList = detailInfo.mainImgList || [];
        let btnText="立即秒杀";
        if(fromIndex === 'qingming' || fromIndex==='fugong' || fromIndex === 'goldWeek') {
            btnText = '登录会员，领5元优惠券';
        }
        var isPc = false
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            isPc = false
        } else {
            isPc = true;
        }
        return (
            <div className={"baokuan-detail "+fromIndex+" "+(isPc?'pc':'mobile')}>
                {loading ? <div className="loading-div"><img src={loadingGif}></img></div> : <div>
                    <div className={"detail-carousel"}>
                        {
                            mainImgList.length>1 ? <Carousel
                                autoplay={true}
                                infinite
                            >
                                {
                                    mainImgList.map((item, index) => {
                                        return (
                                            <img key={index} className='carousel-img' src={item.url} alt="" />
                                        )
                                    })
                                }
                            </Carousel> : 
                            (mainImgList.length === 1?<div>
                                <img style={{display:'block'}} src={mainImgList[0].url}></img>
                            </div>:null)
                        }
                    </div>
                    <div className="detail-text">
                        <div className="detail-price">
                            <span>￥</span>
                            {
                                (fromIndex=='qingming' || fromIndex==='fugong' || fromIndex === 'goldWeek')?<span>{price}</span>:<span>{detailInfo.price}</span>
                            }
                        </div>
                        <h4>{detailInfo.itemName}</h4>
                    </div>
                    {
                        detailInfo.detailImgList && detailInfo.detailImgList.length?<div className="detail-pic">商品详情</div>:null
                    }
                    <div className={'div-imgs '+fromIndex}>
                        {
                            detailInfo.detailImgList && detailInfo.detailImgList.map((item, index) => {
                                return (
                                    <img key={index} className='detail-imgs' src={item.url} alt="" />
                                )
                            })
                        }
                    </div>
                    {
                        ((fromIndex==='qingming' || fromIndex === 'fugong' || fromIndex === 'goldWeek')&&couponOverFlag)?<div className={"detail-sign-up "+fromIndex}><div className="btn not-click">{btnText}</div></div>:<div className={"detail-sign-up "+fromIndex} onClick={()=>{
                                    if(fromIndex === 'qingming' || fromIndex === 'fugong' || fromIndex === 'goldWeek') {
                                        this._getCoupon();
                                    } else {
                                        this.props.history.push('/baokuan/signUp?sapSkuNo='+sapSkuNo+'&type=2');
                                    }
                                }}>
                            <div className={"btn"} >{btnText}</div>
                        </div>
                    }
                </div>}


            </div>
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        asyncGetBaokuanDetail: dispatch.baokuanDetail.asyncGetBaokuanDetail,
        asyncGetCoupon: dispatch.goldWeek.asyncGetCoupon,
    };
};

const mapState = (state) => {
    return {
        detailInfo: state.baokuanDetail.detailInfo,
        loading: state.loading.effects.baokuanDetail.asyncGetBaokuanDetail,
    };
};
export default connect(mapState, mapDispatch)(BaokuanDetail);
