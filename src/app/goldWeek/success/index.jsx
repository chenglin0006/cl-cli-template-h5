/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SuccessImg from './images/success.jpeg'
import { Tools } from '../../../util/index';

class SuccessPage extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    componentDidMount(){
        let fromIndex = Tools.getUrlArg('fromIndex') || 'qingming';
        Tools.getWxData(fromIndex);
        document.title="领券成功";
    }


    render() {
        return (
            <div>
                <img src={SuccessImg}></img>
            </div>
        );
    }
}

export default connect(null, null)(SuccessPage);
