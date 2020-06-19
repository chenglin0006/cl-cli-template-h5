/*eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tools} from '../../../../util/index';
import './index.less';

class Item extends Component {
    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {
        title: ''
    };

    componentDidMount() {

    }

    render() {
        const {detailData} = this.props;
        return (
            <div  className="hot-item" onClick={()=>{
                                this.props.history.push('/baokuan/detail?skuCode='+detailData.sapSkuNoFlag+'&shopCode='+detailData.shopCode);
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
                                Tools.isNotNull(detailData.nowPrice)? <span className="now"><span className="unit">¥</span><span>{detailData.nowPrice}</span></span>:null
                            }
                            {
                                Tools.isNotNull(detailData.beforePrice)?<span className="before"><span className="unit">¥</span><span>{detailData.beforePrice}</span></span>:null
                            }
                            <div className="go-btn">去抢购</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Item;
