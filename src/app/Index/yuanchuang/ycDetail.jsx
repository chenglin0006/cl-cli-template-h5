/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubmitBtn from '../components/submitBtn';
import { Tools } from '../../../util/index';
import '../index.less';
import YC1 from './images/ycsj01.png';
import YC2 from './images/ycsj02.png';
import YC3 from './images/ycsj03.png';
import YC4 from './images/ycsj04.png';
import YC5 from './images/ycsj05.png';
import YC6 from './images/ycsj06.png';
import YCTOP from './images/yc-top.png';

class Detail extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    constructor(props) {
        super(props);
        document.title = '原创设计';
    }

    componentDidMount() {
        Tools.getWxData();
    }

    render() {
        const imgList = [{
            img:YC2,
            id:2,
        },
        {
            img:YC3,
            id:3,
        },
        {
            img:YC4,
            id:4,
        },
        {
            img:YC5,
            id:5,
        },
        {
            img:YC6,
            id:6,
        },
        {
            img:YC1,
            id:1,
        }
        ];
        return (
            <div className="style-page-img-list">
                <div>
                    <div className="top-img">
                        <img src={YCTOP} alt="" />
                    </div>
                    {
                        imgList.map((ele, index) => {
                            return <img
                                onClick={() => {
                                    this.props.history.push(`/yuanchuangdetail/${ele.id}`);
                                }}
                                key={ele.img}
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
