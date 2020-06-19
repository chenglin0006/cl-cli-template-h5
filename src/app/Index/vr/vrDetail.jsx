/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubmitBtn from '../components/submitBtn';
import '../index.less';
import VR1 from './images/vr01.png';
import VR2 from './images/vr02.png';
import VR3 from './images/vr03.png';
import VR4 from './images/vr04.png';
import VR5 from './images/vr05.png';
import VR6 from './images/vr06.png';
import VRTOP from './images/vr-top-2.png';
import { Tools } from '../../../util/index';

class Detail extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    constructor(props) {
        super(props);
        document.title = 'BIM技术';
        Tools.getWxData();
    }

    render() {
        const list = [
            //美式
            {
                img: VR2,
                vr: 'https://yun.kujiale.com/design/3FO4F1NY8U96/show',
            },
            //新中式
            {
                img: VR5,
                vr: 'https://yun.kujiale.com/design/3FO4F1NXMMXT/show',
            },
            //现代
            {
                img: VR1,
                vr: 'https://yun.kujiale.com/design/3FO4HFFKF9NE/show',
            },
            //轻奢
            {
                img: VR3,
                vr: 'https://yun.kujiale.com/design/3FO4F1NWI711/show',
            },
            //日系
            {
                img: VR4,
                vr: 'https://yun.kujiale.com/design/3FO4HYD8HPRJ/show',
            },
            
            //简欧
            {
                img: VR6,
                vr: 'https://yun.kujiale.com/design/3FO4F4M6CDRX/show',
            },
        ];
        return (
            <div className="style-page-img-list">
                <div>
                    <div className="top-img">
                        <img src={VRTOP} alt="" />
                    </div>
                    {
                        list.map((ele) => {
                            return <img
                                key={ele.vr}
                                onClick={() => {
                                    location.href = ele.vr;
                                }}
                                src={ele.img}
                                alt=""
                            />;
                        })
                    }
                </div>
                <SubmitBtn submitTitle={document.title} history={this.props.history} type={3} />
            </div>
        );
    }
}

const mapDispatch = () => {
    return {
    };
};

export default connect(null, mapDispatch)(Detail);
