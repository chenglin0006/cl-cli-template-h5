/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Tools } from '../../../util/index';
import $ from 'jquery';
import '../index.less';
import './brand.less';

class Detail extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeBrandType:'墙地面装饰',
            brandTypeList:[{
                name:'墙地面装饰',
                imgList:[]
            },{
                name:'软装配饰',
                imgList:[]
            },{
                name:'厨房卫浴',
                imgList:[]
            },{
                name:'家具工具门',
                imgList:[]
            },{
                name:'电器',
                imgList:[]
            }]
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.cityBrandList !== this.props.cityBrandList){
            const {cityBrandList} = nextProps;
            const {brandTypeList} = this.state;
            brandTypeList.forEach((ele)=>{
                cityBrandList.forEach((i)=>{
                    if(i.type == ele.name){
                        ele.imgList.push(i)
                    }
                })
            })
            this.setState({brandTypeList})
        }
    }

    componentDidMount() {
        document.title = '品牌展馆';
        Tools.getWxData();
        document.body.scrollTop=document.documentElement.scrollTop=0
        // $(".brand-tab-div").scrollLeft($('.active')[0].offsetLeft-15);
        const {cityBrandList} = this.props;
        const {brandTypeList} = this.state;
        brandTypeList.forEach((ele)=>{
            cityBrandList.forEach((i)=>{
                if(i.type == ele.name){
                    ele.imgList.push(i)
                }
            })
        })
        this.setState({brandTypeList})
    }

    render() {
        const {brandTypeList} = this.state;
        // const {activeBrandType} = this.props;
        const {activeBrandType} = this.state;
        let width  = brandTypeList.length*(80+15);
        
        return (
            <div className="brand-list-page">
                <div className="brand-tab-div">
                    <div id="tabList" className="tab-list" style={{width:width+'px'}}>
                        {
                            brandTypeList.map((ele)=>{
                                return <div className={activeBrandType===ele.name?"brand-tab-item active":"brand-tab-item"} key={ele.name} onClick={()=>{
                                    // this.props.setActiveBrandType(ele.name);
                                    this.setState({activeBrandType:ele.name});
                                }}>{ele.name}</div>
                            })
                        }
                    </div>
                    
                </div>
                {
                    brandTypeList.map((ele)=>{
                        if(ele.name===activeBrandType){
                            if(ele.imgList.length>0){
                                return <div key={ele.name} className="brand-list-div">
                                    {
                                        ele.imgList.map((i)=>{
                                            return  <div className="brand-item" key={i.brand} onClick={() => {
                                                this.props.history.push('/brand/detail/'+i.brand);
                                            }}>
                                                <div className="img-div">
                                                    {
                                                        i.logo?<img src={i.logo.split(',')[0]} alt="" />:null
                                                    }
                                                    
                                                </div>
                                                <div className="name">{i.brand}</div>
                                            </div>
                                        })
                                    }
                                </div>
                            } else {
                                return <div className="no-pic" key={ele.name}>
                                    <img src="https://res1.bnq.com.cn/00eb66b7-d0d0-42c8-8956-e26856316e5c?t=1583918063728" />
                                    <div>该分类暂无品牌~</div>
                                </div>
                            }
                            
                        }
                    })
                }
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        activeBrandType: state.common.activeBrandType,
        cityBrandList: state.common.cityBrandList,
    };
};

const mapDispatch = (dispatch) => {
    return {
        setActiveBrandType:dispatch.common.setActiveBrandType,
    };
};

export default connect(mapState, mapDispatch)(Detail);
