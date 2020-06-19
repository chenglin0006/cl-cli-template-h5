/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.less';
import TopImg1 from './images/top-1.jpeg';
import TopImg2 from './images/top-2.jpeg';
import TopImg3 from './images/top-3.jpeg';
import {Tools} from '../../../util/index';

class Detail extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    componentDidMount() {
        document.title="家装风暴";
        Tools.getWxData();
    }

    render() {
        return (
            <div className="jialiao-div">
                    <img src={TopImg1} />
                    <img src={TopImg2} onClick={()=>{
                        this.props.history.push('/baokuan/signUp?submitTitle=装修风暴&type=3')
                    }} />
                    <img src={TopImg3} />
            </div>
        );
    }
}

const mapDispatch = () => {
    return {
    };
};

export default connect(null, mapDispatch)(Detail);
