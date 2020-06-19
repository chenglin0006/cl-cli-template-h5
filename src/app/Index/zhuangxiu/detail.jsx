import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../index.less';
import DetailImg from './images/zxyh.jpeg';
import DetailPage from '../components/detail';
import { Tools } from '../../../util/index';

class Detail extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    componentDidMount() {
        Tools.getWxData();
    }

    render() {
        return (
            <DetailPage
                DetailImgs={[DetailImg]}
                title="装修优惠"
                history={this.props.history}
                type={3}
            />
        );
    }
}

const mapDispatch = () => {
    return {
    };
};

export default connect(null, mapDispatch)(Detail);
