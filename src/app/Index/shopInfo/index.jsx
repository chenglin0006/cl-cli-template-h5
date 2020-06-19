import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../index.less';
import DetailPage from '../components/detail';
import { Tools } from '../../../util/index';
import S1 from './images/s1.png';
import S2 from './images/s2.png';
import S3 from './images/s3.png';
import S4 from './images/s4.png';
import S5 from './images/s5.png';
import S6 from './images/s6.png';
import S7 from './images/s7.png';
import S8 from './images/s8.png';
import S9 from './images/s9.png';
import S10 from './images/s10.png';
import S11 from './images/s11.png';
import S12 from './images/s12.png';
import S13 from './images/s13.png';

class Detail extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    componentDidMount() {
        const fromIndex = Tools.getUrlArg('fromIndex');
        if (fromIndex === 'qingming') {
            Tools.getWxData('qingming');
        } else if (fromIndex === 'fugong') {
            Tools.getWxData('fugong');
        } else if (fromIndex === 'goldWeek') {
            Tools.getWxData('goldWeek');
        } else if (fromIndex === 'huanbao') {
            Tools.getWxData('huanbao');
        } else {
            Tools.getWxData();
        }
    }

    render() {
        return (
            <DetailPage
                DetailImgs={[S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13]}
                title="参与门店信息"
                history={this.props.history}
                hasSignUpBtn={false}
            />
        );
    }
}

const mapDispatch = () => {
    return {
    };
};

export default connect(null, mapDispatch)(Detail);
