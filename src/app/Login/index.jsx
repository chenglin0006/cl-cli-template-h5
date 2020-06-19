/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tools } from '../../util/index';
import './index.less'
import $ from 'jquery'
import {Toast} from 'antd-mobile';
import CheckImg from './images/check.png';
import UnCheckImg from './images/unCheck.png';
import {InputItem} from 'antd-mobile';

var devAdress = '';
class Login extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    constructor(props) {
        super(props);
        this.timeId = 60;
        this.state = {
            fromIndex:Tools.getUrlArg('fromIndex') || 'qingming',
            telephoneNumber : '', //电话
            imgCode:'', //图形验证码链接
            imgCodeNumber: '',  //图形验证码
            phoneCode:'',   //手机短信验证码
            timeSeconds: '',
            hasSendMsg: false,
            checkSaveIf: true,
            sapSkuNo:Tools.getUrlArg('sapSkuNo'),
            activityNo:Tools.getUrlArg('activityNo'),
        };
    }

    checkPhone = () => {
        var mobile = this.state.telephoneNumber;
        return /^1[3|4|5|6|7|8]\d{9}$/.test(mobile);
    }

    componentDidMount() {
        let {fromIndex} = this.state;
        document.title="会员登录";
        Tools.getWxData('qingming');
        let env = Tools.getEnv();
        if(env === 'development' || env ==='prodDev'){
            devAdress = '//m-dev.market.bnq.com.cn';
        } else {
            devAdress = '//m.market.bnq.com.cn';
        }
    }

    telephoneChange = (v) => {
        this.setState({telephoneNumber:v,imgCode:'',imgCodeNumber:''});
    }

    getImgCode = () =>{
        const {telephoneNumber} = this.state;
        if (!this.checkPhone()) {
            Toast.fail('手机号码有误，请重填',2);
            return;
        } else {
            var imgSrc = devAdress+'/wx-web/public/web/getValidateCode.do?imgToken=' + telephoneNumber + '&name=' + Math.random();
            this.setState({imgCode:imgSrc});
        }
    }

    setCountFun = () => {
        if (this.timeId-- > 0) {
            this.setState({timeSeconds:this.timeId});
            setTimeout(() => {
                this.setCountFun();
            }, 1000);
        } else {
            this.setState({hasSendMsg:false,imgCodeNumber:''},() => {
                this.timeId=60;
            });
            this.getImgCode();
        }
    }

    getPhoneCode = () =>{
        const {telephoneNumber,imgCodeNumber} = this.state;
        if (!this.checkPhone()) {
            Toast.fail('手机号码有误，请重填',2);
            return;
        } else {
            var telephone = telephoneNumber;
            var vcode = imgCodeNumber;
            if(vcode==''){
                Toast.fail('请输入图片验证码',2);
                return
            }
            $.ajax({
                method: 'post',
                url: devAdress + "/wx-web/public/web/getVerifyCode.do",
                data: JSON.stringify({
                    data: {
                        mobile: telephone,
                        imgCode: vcode
                    }
                }),
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                contentType: "application/json",
                success:  (data) => {
                    if (data.code == 0) { // 图形验证码 http://gz2.bnq.com.cn/Home/Code/send.html
                        Toast.success('短信发送成功',2);
                        this.setState({hasSendMsg:true});
                        this.setCountFun();
                    } else {
                        Toast.fail(data.msg,2);
                    }
                }
            });
        }
    }

    submitFun=() => {
        const {telephoneNumber,phoneCode,checkSaveIf,activityNo,fromIndex } = this.state;
        const {asyncGetCoupon} = this.props;
        if (!this.checkPhone()) {
            Toast.fail('手机号码有误，请重填',2);
            return;
        } 
        if(phoneCode==''){
            Toast.fail('请输入手机验证码',2);
            return
        }
        var telephone = telephoneNumber;
        var vcode = phoneCode;
        var params = {
            phone: telephone,
            activityNo: activityNo,
            smsPassword: vcode,
        }
        asyncGetCoupon(params).then((data) => {
            console.log(data);
            if(checkSaveIf && data.sessionToken){
                if(fromIndex === 'qingming'){
                    sessionStorage.setItem('qingMingLoginToken',data.sessionToken);
                } else if(fromIndex === 'fugong'){
                    sessionStorage.setItem('fugongLoginToken',data.sessionToken);
                } else if(fromIndex === 'goldWeek'){
                    sessionStorage.setItem('goldWeekLoginToken',data.sessionToken);
                }
            } else {
                if(fromIndex === 'qingming'){
                    sessionStorage.setItem('qingMingLoginToken','');
                } else if(fromIndex === 'fugong'){
                    sessionStorage.setItem('fugongLoginToken','');
                } else if(fromIndex === 'goldWeek'){
                    sessionStorage.setItem('goldWeekLoginToken','');
                }
            }
            let typeMeta = data.code;
            if(typeMeta === 1){
                this.props.history.push('/coupon5/success?fromIndex='+fromIndex);
            } else if(typeMeta === 2){
                Toast.fail('您已领取过相关优惠券',2);
            } else if (typeMeta === 3){
                Toast.fail('该优惠券已经没啦 ',2);
            } 
        }).catch((error)=>{
            error.reason&&Toast.fail(error.reason);
        })
    }

    render() {
        const {imgCode,telephoneNumber,imgCodeNumber,hasSendMsg,timeSeconds,checkSaveIf,phoneCode} = this.state;
        const {loading} = this.props;
        return (
            <div className="qingming-login-page">
                <div className="desc-div">如您的手机号未注册，将自动创建登录账号</div>
                <div className="login-form">
                        <div className="phone-number flex-div">
                            <div className="left">手机号</div>
                            <InputItem
                                onChange={this.telephoneChange}
                                value={telephoneNumber} 
                                placeholder="请输入手机号"
                                maxLength="11"
                                className='center'>
                            </InputItem>
                            {/* <input className="center" value={telephoneNumber} onChange={this.telephoneChange} type="text" id="register_phone" className="register_phone" maxLength="11" placeholder="请输入手机号" /> */}
                        </div>
                        <div className="img-code-div flex-div">
                            <div className="left">图形码</div>
                            <div className="center">
                            <InputItem
                                onChange={(v) => {
                                        this.setState({imgCodeNumber:v});
                                }}
                                value={imgCodeNumber} 
                                placeholder="请输入图形验证码"
                                className='center'>
                            </InputItem>
                            </div>
                            {
                                imgCode?<img src={imgCode} onClick={this.getImgCode}></img>:<div className="get-img-code-btn right" onClick={this.getImgCode}>
                                    获取图形验证码
                                </div>
                            }
                            
                        </div>

                        <div className="phone-code-div flex-div">
                            <div className="left">验证码</div>
                            <div className="center">
                                <InputItem
                                    onChange={(v) => {
                                            this.setState({phoneCode:v});
                                    }}
                                    value={phoneCode} 
                                    placeholder="请输入手机验证码"
                                    className='center'
                                    maxLength={6}>
                                    
                                </InputItem>
                            </div>
                                {
                                    hasSendMsg?<span className="btn-text right">重发{timeSeconds}s</span>:<div className="btn-text right" onClick={this.getPhoneCode}>获取验证码</div>
                                }
                        </div>

                        <div className="save-check">
                            <span onClick={() => {
                                this.setState({checkSaveIf:!checkSaveIf})
                            }}>
                                {
                                    checkSaveIf?<img src={CheckImg}></img>:<img src={UnCheckImg}></img>
                                }
                                <span className="text">保存本次登录信息</span>
                            </span>
                        </div>
                        <div className="submit-btn" onClick={this.submitFun}>
                            立即领券
                        </div>
                        {
                            loading?<div className="loading">
                                <img src="//static.bnq.com.cn/img/creditsExchange/loading.gif" />
                            </div>:null
                        }
                        
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        loading: state.loading.effects.goldWeek.asyncGetCoupon,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncGetCoupon:dispatch.goldWeek.asyncGetCoupon,
    };
};

export default connect(mapState, mapDispatch)(Login);
