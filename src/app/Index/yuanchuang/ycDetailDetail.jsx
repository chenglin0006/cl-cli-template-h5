/* eslint-disable radix */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.less';
import PropTypes from 'prop-types';
import YC1 from './images/ycsj01-01.jpg';
import YC2 from './images/ycsj02-01.jpg';
import YC3 from './images/ycsj03-01.jpg';
import YC4 from './images/ycsj04-01.jpg';
import YC5 from './images/ycsj05-01.jpg';
import YC6 from './images/ycsj06-01.jpg';
import DetailPage from '../components/detail';
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

    constructor(props) {
        super(props);
        this.state = {
            styleType: parseInt(props.match.params.type),
            styleImg: null,
            styleTitle: null,
        };
    }

    componentDidMount() {
        const { styleType } = this.state;
        const titleMap = {
            1: '安逸时光',
            2: '木然清风',
            3: '简单爱',
            4: '瑟僩赫咺',
            5: '冷静',
            6: '武林九里',
        };
        const imgMap = {
            1: YC1,
            2: YC2,
            3: YC3,
            4: YC4,
            5: YC5,
            6: YC6,
        };
        this.setState({ styleImg: imgMap[styleType], styleTitle: titleMap[styleType] });
        Tools.getWxData();
    }

    render() {
        return (
            <DetailPage
                DetailImgs={[this.state.styleImg]}
                title={`原创设计-${this.state.styleTitle}`}
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
