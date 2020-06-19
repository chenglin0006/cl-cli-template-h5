/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import PropTypes from 'prop-types';
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
    
        };
    }

    componentWillMount() {
        document.title = 'DEMO';
    }

    componentWillUnmount(){
        clearInterval(timer);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
               DEMO PAGE
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        cityName: state.common.cityName,
        loading: state.loading.effects.common.asyncGetSkuList,
    };
};

const mapDispatch = (dispatch) => {
    return {
        setCityName:dispatch.common.setCityName,
        asyncGetTotalNumber:dispatch.homeIndex.asyncGetTotalNumber,
    };
};

export default connect(mapState, mapDispatch)(Index);
