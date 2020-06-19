/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loadingGif from '../../images/loading.gif'
import HotItem from '../../components/hotItem/index';
import { Tools } from '../../../../util/index';
import './index.less';

class Baokuan extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    componentDidMount() {
        document.title = '爆款秒杀';
        Tools.getWxData();
    }

    componentWillUnmount() {
    }


    render() {
        const {loading,hotSkuList}  = this.props;
        return (
            <div className="baokuan-page">
                <div className={"hot-list "+(loading?"loading":"")}>
                    {
                        loading?<div className="loading-div"><img src={loadingGif}></img></div>:hotSkuList.length?hotSkuList.map((ele, index)=>{
                            return <HotItem history={this.props.history} key={ele.id} detailData={ele}></HotItem>
                        }):<div className="no-div">暂无商品</div>
                    }
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        hotSkuList: state.common.hotSkuList,
        loading: state.loading.effects.common.asyncGetSkuList,
    };
};

const mapDispatch = (dispatch) => {
    return {
    };
};

export default connect(mapState, mapDispatch)(Baokuan);
