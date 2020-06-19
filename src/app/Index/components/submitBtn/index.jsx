/*eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less';
import btnImg from './images/btn.jpg';

class submitBtn extends Component {
    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {
        title: ''
    };

    render() {
        const {submitTitle, type} = this.props
        return (
            <div className="submit-btn" onClick={() => {
                this.props.history.push('/baokuan/signUp?submitTitle='+submitTitle+'&type='+type)
            }}>
                <img src={btnImg} />
            </div>
        );
    }
}

export default submitBtn;
