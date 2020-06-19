/*eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubmitBtn from '../submitBtn/index'
import './index.less';

class Detail extends Component {
    static propTypes = {
        DetailImgs: PropTypes.object,
        title: PropTypes.string,
        type:PropTypes.string
    };

    static defaultProps = {
        DetailImg: [],
        title: '',
        type: '',
    };

    componentWillReceiveProps(nextProps){
        let titleList = nextProps.title.split('-');
        if(titleList.length>1){
            document.title = titleList[1]
        } else {
            document.title = titleList[0]
        }
    }

    componentDidMount() {
        let titleList = this.props.title.split('-');
        if(titleList.length>1){
            document.title = titleList[1]
        } else {
            document.title = titleList[0]
        }
    }

    render() {
        const {DetailImgs, hasSignUpBtn=true, type,title} = this.props
        return (
            <div className={"style-detail-page "+(!hasSignUpBtn?"no-btn":"")}>
                {
                    DetailImgs.map((ele)=>{
                        return <img src={ele} alt="" />
                    })
                }
                {
                    hasSignUpBtn?<SubmitBtn submitTitle={title} type={type} history={this.props.history} />:null
                }
            </div>
        );
    }
}

export default Detail;
