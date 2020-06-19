/* eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './brand.less';
import brandListData from '../../Index/Json/brandData';
import skuList from '../../Index/Json/hotJson';
import HotItem from "../components/hotItem/index"
import { Tools } from '../../../util/index';

class Detail extends Component {
    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object,
    };

    static defaultProps = {
        match: null,
        history: null,
    };

    getCurrentBrandCityBrandList=()=>{
        const {hotSkuList,cityName} = this.props;
        let list = [];
        skuList.forEach((ele)=>{
            if(ele.brand === this.state.id){
                if(ele.allCountry==='是' && ele.notInCitys===''){
                    list.push(ele);
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
                        list.push(ele);
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
                        list.push(ele);
                    }
                }
            }
        })
        let targetBrandList = [];
        list.forEach((ele)=>{
            hotSkuList.forEach((i)=>{
                if(ele.sku+'' === i.sapSkuNoFlag+''){
                    targetBrandList.push(i);
                }
            })
        })
        let resultList = [];
        var repeatObj = {};
        for(var i =0; i<targetBrandList.length; i++){
            if(!repeatObj[targetBrandList[i].id]){
                resultList.push(targetBrandList[i]);
                repeatObj[targetBrandList[i].id] = true;
            }
        }
        return resultList;
    }

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            detailData:{},
        };
    }

    componentDidMount() {
        document.title = '品牌详情';
        console.log(this.state.id);
        brandListData.forEach((ele)=>{
            if(ele.brand+'' == this.state.id+''){
                this.setState({detailData:ele})
            }
        })
        Tools.getWxData();
        document.body.scrollTop=document.documentElement.scrollTop=0
    }

    render() {
        const {detailData} = this.state;
        let list = detailData&&detailData.activity&&detailData.activity.trim()&&detailData.activity.trim().split(';') || [];
        let skuListData = this.getCurrentBrandCityBrandList();
        return (
            <div className={"brand-detail-page"}>           
                <div className="logo-title">
                    
                    <div className="img-div">
                        {
                            detailData.logo?<img src={detailData.logo.split(',')[0]} alt="" />:null
                        }
                    </div>
                    <div>
                        <div className="ch-name">{detailData.brand}</div>
                        <div className="en-name">{detailData.enName}</div>
                    </div>
                </div>
                {
                    list.length ?<div className="discount-content">
                            <div className="title">家博会专享</div>
                            <div>
                                {
                                    list.map((ele,index)=>{
                                        return ele?<div key={index} className="content-item">
                                            <div className="li-div"></div>
                                            {ele}
                                        </div>:null
                                    })
                                }
                            </div>
                    </div>:null
                }
                {
                    skuListData.length?<div className="brand-hot-list">
                        <div className="title">品牌爆品</div>
                        {
                            skuListData.map((ele,index)=>{
        
                                return <HotItem history={this.props.history} key={ele.id} detailData={ele}></HotItem>
                            })
                        }
                    </div>:null
                }
                {
                    (detailData.des || detailData.video)?<div className="brand-desc">
                        <div className="desc-title">品牌介绍</div>
                        <div className="desc-text" dangerouslySetInnerHTML={{__html: detailData.des}}>
                        </div>
                        {
                            detailData.video?<div className="brand-video">
                                <video poster="https://res1.bnq.com.cn/6f53a573-8c29-401a-8ff0-8f5cb84c1cdc?t=1583896698173" controls src={detailData.video.split(',')[0]} />
                            </div>:null
                        }
                        
                    </div>:null
                }
                {
                    <div onClick={()=>{
                        this.props.history.push('/baokuan/signUp?type=1&submitTitle=品牌详情'+'&brand='+detailData.brand);
                    }} className="submit-btn-fix">
                        <div className="btn">立即参与活动</div>
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
    };
};

const mapDispatch = (dispatch) => {
    return {
    };
};

export default connect(mapState, mapDispatch)(Detail);
