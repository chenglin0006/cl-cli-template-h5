/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import { Picker, List, InputItem, Toast } from 'antd-mobile';
import './index.less';
import cityListData from '../../Json/cityJson';
import hotCityData from '../../Json/hotJson';
import cityShopData from '../../Json/cityShop'
import brandList from '../../Json/brandData';
import { Tools, Remote } from '../../../../util/index.js';
import Config from '../../../../../config/index';
import MD5 from 'crypto-js/md5'


// import DetailPage from '../components/detail';
let sapSkuNo, newListData, submitTitle, type;

class BaokuanSignUp extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            sValue: [],
            isShowSuccessBox: false,
            phoneMd5: '',
            shop:[],
            shopList:[],
            fromIndex:'',
        }
    }

    //删除数组中指定元素
    removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    initCityShopList=(cityName) => {
        let list = [];
        cityShopData.forEach((ele)=>{
            if(list.indexOf(ele.city)===-1){
                list.push(ele.city);
            }
        })
        let arry = []
        list.forEach((ele)=>{
            let obj = {
                city:ele,
                shops:[],
            }
            cityShopData.forEach((i)=>{
                if(i.city === ele){
                    obj.shops.push({
                        label:i.shopName,
                        value:i.shopName
                    });
                }
            })
            arry.push(obj);
        })

        arry.forEach((ele)=>{
            if(cityName.indexOf(ele.city)>-1){
                this.setState({shopList:ele.shops});
            }
        })
        console.log(arry, this.state.shopList);
    }

    componentDidMount() {
        let fromIndex = Tools.getUrlArg('fromIndex');
        let phone = sessionStorage.getItem('alreadySignUp');
        if (fromIndex === 'qingming'){
            phone = sessionStorage.getItem('alreadySignUpQingming');
            Tools.getWxData('qingming');
        } else if (fromIndex === 'fugong'){
            phone = sessionStorage.getItem('alreadySignUpFugong');
            Tools.getWxData('fugong');
        } else if(fromIndex === 'goldWeek'){
            phone = sessionStorage.getItem('alreadySignUpGoldWeek');
            Tools.getWxData('goldWeek');
        } else if(fromIndex === 'huanbao'){
            phone = sessionStorage.getItem('alreadySignUpHuanbao');
            Tools.getWxData('huanbao');
        } else {
            Tools.getWxData();
        }
        if(phone){
            this.setState({
                isShowSuccessBox: true,
                phoneMd5: phone,
                fromIndex: fromIndex
            })
        }else {
            this.setState({
                isShowSuccessBox: false,
                phoneMd5: '',
                fromIndex: fromIndex
            })
        }
        let cityName = this.props.cityName;
        this.initCityShopList(cityName);
        newListData = Tools.deepClone(cityListData);
        submitTitle = Tools.getUrlArg('submitTitle');
        type = Tools.getUrlArg('type');
        if (submitTitle && type == 1) {
            this.handleBrands();
        } else if (type == 2) {
            this.handleProducts();
        }
        document.title = type+''===2+''?'秒杀报名':'活动报名';
        cityListData.forEach((ele) => {
            if (cityName && cityName.indexOf(ele) > -1) {
                this.setState({ sValue: [ele] });
            }
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cityName !== this.props.cityName) {
            let cityName = nextProps.cityName;
            cityListData.forEach((ele) => {
                if (cityName.indexOf(ele) > -1) {
                    this.setState({ sValue: [ele] });
                }
            })
            this.initCityShopList(cityName);
        }
    }

    //处理爆品详情可选择的城市
    handleProducts = () => {
        sapSkuNo = Tools.getUrlArg('sapSkuNo');
        if (sapSkuNo) {
            hotCityData.forEach((item, index) => {
                if (item.sku == sapSkuNo) {
                    if (item.allCountry == '是') {
                        if (item.notInCitys) {
                            let arr = item.notInCitys.split(',');
                            for (let i = 0; i < arr.length; i++) {
                                this.removeByValue(newListData, arr[i]);
                            }
                        } else {

                        }
                    } else {
                        let cityArr = item.citys.split(',');
                        newListData = cityArr;
                    }
                }
            });
        }
    }

    //处理品牌可选择的城市
    handleBrands = () => {
        let brand = Tools.getUrlArg('brand');
        if (brand) {
            brandList.forEach((item, index) => {
                if (item.brand == brand) {
                    if (item.allCountry == '是') {
                        if (item.notInCitys) {
                            let arr = item.notInCitys.split(',');
                            for (let i = 0; i < arr.length; i++) {
                                this.removeByValue(newListData, arr[i]);
                            }
                        } else {

                        }
                    } else {
                        let cityArr = item.citys.split(',');
                        newListData = cityArr;
                    }
                }
            });
        }
    }

    submit = () => {
        const { fromIndex } = this.state;
        this.props.form.validateFields((err, value) => {
            if (!value.name) {
                Toast.fail('请输入姓名');
                return
            }
            if (!Tools.checkPhone(value.telephone)) {
                Toast.fail('请输入有效手机号');
                return
            }
            type = Tools.getUrlArg('type');

            let params = {
                way: 1242, //家博会
                cityName: this.state.sValue[0],
                phone: value.telephone,
                couponCode: MD5(value.telephone).toString().slice(3, 18),
                targetId: -1,
                name: value.name,
                type,
                shopName: value.shopName[0] || '',
                deviceCode: "h5",
                sourceUrl: Config[Remote.getEnv()].pageUrl + location.pathname
            };
            if(this.state.fromIndex === 'qingming') {
                params.way = 1245; //清明
            }

            if(this.state.fromIndex === 'fugong') {
                params.way = 1246; //复工
            }

            if(this.state.fromIndex === 'goldWeek') {
                params.way = 1247; //黄金周
            }

            if(this.state.fromIndex === 'huanbao') {
                params.way = 1248; //黄金周
            }
            if(params.shopName){
                cityShopData.forEach((ele)=>{
                    if(ele.shopName===params.shopName){
                        params.shopCode = ele.shopCode
                    }
                })
            }
            if (sapSkuNo) {
                params.targetId = sapSkuNo;
            }
            if (submitTitle) {
                params.targetId = decodeURIComponent(submitTitle);
            }
            if(Tools.getUrlArg('brand')){
                params.targetId = decodeURIComponent(Tools.getUrlArg('brand'));
            }
            this.props.asyncSubmitUser(params).then((data) => {
                if (data.code == 0) {
                    if(fromIndex === 'qingming'){
                        sessionStorage.setItem('alreadySignUpQingming',MD5(value.telephone).toString().slice(3, 18));
                    }else if(fromIndex === 'fugong'){
                        sessionStorage.setItem('alreadySignUpFugong',MD5(value.telephone).toString().slice(3, 18));
                    } else if(fromIndex === 'goldWeek'){
                        sessionStorage.setItem('alreadySignUpGoldWeek',MD5(value.telephone).toString().slice(3, 18));
                    } else if(fromIndex === 'huanbao'){
                        sessionStorage.setItem('alreadySignUpHuanbao',MD5(value.telephone).toString().slice(3, 18));
                    }else {
                        sessionStorage.setItem('alreadySignUp',MD5(value.telephone).toString().slice(3, 18));
                    }
                    this.setState({
                        isShowSuccessBox: true,
                        phoneMd5: MD5(value.telephone).toString().slice(3, 18)
                    })
                    document.title = '报名成功';
                }

            }).catch((error) => {
                if (error.code == 6) {
                    if(fromIndex === 'qingming'){
                        sessionStorage.setItem('alreadySignUpQingming',MD5(value.telephone).toString().slice(3, 18));
                    } else if(fromIndex === 'fugong'){
                        sessionStorage.setItem('alreadySignUpFugong',MD5(value.telephone).toString().slice(3, 18));
                    } else if(fromIndex === 'goldWeek'){
                        sessionStorage.setItem('alreadySignUpGoldWeek',MD5(value.telephone).toString().slice(3, 18));
                    } else if(fromIndex === 'huanbao'){
                        sessionStorage.setItem('alreadySignUpHuanbao',MD5(value.telephone).toString().slice(3, 18));
                    } else {
                        sessionStorage.setItem('alreadySignUp',MD5(value.telephone).toString().slice(3, 18));
                    }
                    this.setState({
                        isShowSuccessBox: true,
                        phoneMd5: MD5(value.telephone).toString().slice(3, 18)
                    })
                    document.title = '报名成功';
                } else {
                    Toast.fail(error.reason);
                }
            })
        });
    }


    render() {
        const { getFieldProps } = this.props.form;
        const { shopList,fromIndex } = this.state;
        const cityEnum = []
        let type = Tools.getUrlArg('type');



        newListData && newListData.forEach((ele, index) => {
            cityEnum.push({
                label: ele,
                value: ele,
            })
        });

        if (this.state.isShowSuccessBox) {
            return (
                <div className="mask-success">
                    <div className="mask-content">
                        <h4>恭喜您已成功报名</h4>
                        <div className="mask-code">
                            <div className='code-div'>
                                <p className='code'>{this.state.phoneMd5}</p>
                                <p className='code-explain'>您可保存截图，到门店出示</p>
                            </div>
                        </div>
                        <p className='all-coupon all-top'>本活动所领取优惠券及折扣</p>
                        <p className='all-coupon'>均已通过报名手机号绑定</p>
                        <p className='ask-phone'>百安居咨询热线：400-820-0707</p>
                    </div>
                    {
                        !fromIndex?<div className="activity-time">活动时间：2020年03月20日至2020年03月31日</div>:null
                    }
                    {
                        fromIndex === 'qingming'?<div className="activity-time">活动时间：2020年04月01日至2020年04月06日</div>:null
                    }
                    {
                        fromIndex === 'fugong'?<div className="activity-time">活动时间：2020年04月10日至2020年04月20日</div>:null
                    }
                    {
                        fromIndex === 'goldWeek'?<div className="activity-time">活动时间：2020年04月25日至2020年05月06日</div>:null
                    }
                    {
                        fromIndex === 'huanbao'?<div className="activity-time">活动时间：2020年04月24日至2020年05月06日</div>:null
                    }
                    
                    <p className="coupon-detail" onClick={() => {
                            this.props.history.push('/couponinfo?fromIndex='+this.state.fromIndex);
                        }}>查看优惠明细</p>
                    <div className="mask-success-btns">
                        <button onClick={() => {
                            this.props.history.push('/shopinfo?fromIndex='+this.state.fromIndex);
                        }}>查看门店</button>
                        <button onClick={() => {
                            if(this.state.fromIndex==='qingming'){
                                this.props.history.push('/qingming')
                            } else if(this.state.fromIndex==='fugong'){
                                this.props.history.push('/fugong')
                            } else if(this.state.fromIndex==='goldWeek'){
                                this.props.history.push('/goldWeek')
                            } else if(this.state.fromIndex==='huanbao'){
                                this.props.history.push('/huanbao')
                            } else {
                                this.props.history.push('/index')
                            }
                        }}>返回首页</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="baokuan-sign-up">
                    <div>
                        <div className={"sign-up-banner "+this.state.fromIndex}></div>
                        <div className="sign-up-form">
                            <form>
                                <Picker data={cityEnum}
                                    cols={1}
                                    value={this.state.sValue}
                                    {...getFieldProps('cityName', {
                                        rules: [{ required: true, message: '请选择城市' }],
                                        initialValue: this.state.sValue
                                    })}
                                    onChange={v => {
                                        console.log('change');
                                        this.setState({ shop: [] })
                                        this.initCityShopList(v);
                                    }}
                                    onOk={v => this.setState({ sValue: v })} className="forss">
                                    <List.Item arrow="horizontal">选择地区</List.Item>
                                </Picker>
                                <Picker data={shopList}
                                    cols={1}
                                    value={this.state.shop}
                                    {...getFieldProps('shopName', {
                                        initialValue: this.state.shop
                                    })}
                                    onChange={v => this.setState({ shop: v })}
                                    onOk={v => this.setState({ shop: v })} className="forss">
                                    <List.Item arrow="horizontal">选择门店</List.Item>
                                </Picker>
                                <InputItem
                                    {...getFieldProps('name', {
                                        rules: [
                                            { required: true, message: '请输入姓名' },
                                        ],
                                    })}
                                    placeholder="请输入姓名"
                                    className='sign-up-name'>
                                    姓名
                            </InputItem>
                                <InputItem
                                    {...getFieldProps('telephone', {
                                        rules: [
                                            { required: true, message: '请输入手机号' },
                                            { pattern: /^1\d{10}$/, message: '请输入正确的手机号码' },
                                        ],
                                    })}
                                    placeholder="请输入手机号"
                                    className='sign-up-name'>
                                    手机
                            </InputItem>
                            </form>
                            <div className="div-btn">
                                <button className='sign-up-btn' onClick={this.submit}>
                                    {type+''===2+''?'立即秒杀':'立即报名'}
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapState = (state) => {
    return {
        cityName: state.common.cityName,
    };
};

const mapDispatch = (dispatch) => {
    return {
        asyncSubmitUser: dispatch.signUp.asyncSubmitUser
    };
};

export default connect(mapState, mapDispatch)(createForm()(BaokuanSignUp));
