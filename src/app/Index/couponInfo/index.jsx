/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../index.less';
import DetailPage from '../components/detail';
import { Tools } from '../../../util/index';
import Y1 from './images/y1.png';
import Y2 from './images/y2.png';
import Y3 from './images/y3.png';
import Y4 from './images/y4.png';
import Y5 from './images/y5.png';
import Y6 from './images/y6.png';
import Y7 from './images/y7.png';
import Y8 from './images/y8.png';
import Y9 from './images/y9.png';
import Y10 from './images/y10.png';
import Y11 from './images/y11.png';
import Y12 from './images/y12.png';
import Y13 from './images/y13.png';
import Y14 from './images/y14.png';
import Y15 from './images/y15.png';
import './index.less';

class Detail extends Component {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: null,
    };

    componentDidMount() {
        let fromIndex = Tools.getUrlArg('fromIndex');
        if(fromIndex==='qingming'){
            Tools.getWxData('qingming');
        } else if(fromIndex==='goldWeek'){
            Tools.getWxData('goldWeek');
        } else if(fromIndex==='huanbao'){
            Tools.getWxData('huanbao');
        } else {
            Tools.getWxData();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            fromIndex: Tools.getUrlArg('fromIndex')
        };
    }

    render() {
        const {fromIndex} = this.state;
        return (
            <span>
                {
                    !fromIndex?<DetailPage
                        DetailImgs={[Y1, Y2, Y3, Y4, Y5, Y6, Y7, Y8, Y9, Y10, Y11, Y12, Y13, Y14, Y15]}
                        title="优惠信息"
                        history={this.props.history}
                        hasSignUpBtn={false}
                    />: null
                }
                {
                    fromIndex==='qingming'?<div className="qing-ming-coupon">
                        <div className="title">装修现金券</div>
                        <div className="content">
                            全国百安居门店（中型店除外）<br></br>
                            凡在百安居H5报名，且在2020年4月1日至4月6日期间与线下百安居装修设计中心签订定单或合同的客户，可额外获得300元装修券，具体如下：<br></br>
                            1.签定线下个性化装修订单的客户，结算时可额外再减300元应付人工费。<br></br>
                            2.签定装修套餐合同的客户，签约时可额外再减300元合同额。<br></br>
                            <br></br>
                            活动说明<br></br>
                            1.客户在H5上报名后，请妥善保管屏幕显示的凭证串码，在到线下签定单时，需要出示给百安居装修设计中心工作人员，并由工作人员填写在本“确认单”上，方可参加活动。<br></br>
                            <br></br>
                            2.本活动可以与商场同期其他材料零售促销（如有）同享。<br></br>
                            <br></br>
                            3.本活动规则所涉之“决算合同额”指装修竣工决算时，客户实付材料费、实付人工费、实付管理费、实付个性化设计费及测量费的含税金额总和。<br></br>
                            <br></br>
                            4.本活动规则所涉之“应付人工费”仅指在装修施工合同中约定的由百安居装修设计中心施工队提供服务的人工费，材料供应商提供安装服务的收费不参与本次优惠活动。如竣工结算时的应付人工费少于可优惠的金额，则应付人工费全免，且百安居无须向客户退还差额部分。优惠金额不可出售和转让，不可兑换现金，不找零。<br></br>
                            <br></br>
                            5.客户确认，其已清楚理解并完全同意本次活动的活动内容及条件。如客户未能达到本次活动的条件，则客户无法享受相应的优惠活动。<br></br>
                        </div>
                    </div>:null
                }
                {
                    fromIndex==='fugong'?<div className="qing-ming-coupon">
                        <div className="title">装修现金券</div>
                        <div className="content">
                            全国百安居门店（中型店除外）<br></br>
                            凡在百安居H5报名，且在2020年4月10日至4月20日期间与线下百安居装修设计中心签订定单或合同的客户，可额外获得300元装修券，具体如下：<br></br>
                            1.签定线下个性化装修订单的客户，结算时可额外再减300元应付人工费。<br></br>
                            2.签定装修套餐合同的客户，签约时可额外再减300元合同额。<br></br>
                            <br></br>
                            活动说明<br></br>
                            1.客户在H5上报名后，请妥善保管屏幕显示的凭证串码，在到线下签定单时，需要出示给百安居装修设计中心工作人员，并由工作人员填写在本“确认单”上，方可参加活动。<br></br>
                            <br></br>
                            2.本活动可以与商场同期其他材料零售促销（如有）同享。<br></br>
                            <br></br>
                            3.本活动规则所涉之“决算合同额”指装修竣工决算时，客户实付材料费、实付人工费、实付管理费、实付个性化设计费及测量费的含税金额总和。<br></br>
                            <br></br>
                            4.本活动规则所涉之“应付人工费”仅指在装修施工合同中约定的由百安居装修设计中心施工队提供服务的人工费，材料供应商提供安装服务的收费不参与本次优惠活动。如竣工结算时的应付人工费少于可优惠的金额，则应付人工费全免，且百安居无须向客户退还差额部分。优惠金额不可出售和转让，不可兑换现金，不找零。<br></br>
                            <br></br>
                            5.客户确认，其已清楚理解并完全同意本次活动的活动内容及条件。如客户未能达到本次活动的条件，则客户无法享受相应的优惠活动。<br></br>
                        </div>
                    </div>:null
                }
                {
                    fromIndex==='goldWeek'?<div className="qing-ming-coupon">
                        <div className="title">装修现金券</div>
                        <div className="content">
                            全国百安居门店（中型店除外）<br></br>
                            凡在百安居H5报名，且在2020年4月25日至5月06日期间与线下百安居装修设计中心签订定单或合同的客户，可额外获得300元装修券，具体如下：<br></br>
                            1.签定线下个性化装修订单的客户，结算时可额外再减300元应付人工费。<br></br>
                            2.签定装修套餐合同的客户，签约时可额外再减300元合同额。<br></br>
                            <br></br>
                            活动说明<br></br>
                            1.客户在H5上报名后，请妥善保管屏幕显示的凭证串码，在到线下签定单时，需要出示给百安居装修设计中心工作人员，并由工作人员填写在本“确认单”上，方可参加活动。<br></br>
                            <br></br>
                            2.本活动可以与商场同期其他材料零售促销（如有）同享。<br></br>
                            <br></br>
                            3.本活动规则所涉之“决算合同额”指装修竣工决算时，客户实付材料费、实付人工费、实付管理费、实付个性化设计费及测量费的含税金额总和。<br></br>
                            <br></br>
                            4.本活动规则所涉之“应付人工费”仅指在装修施工合同中约定的由百安居装修设计中心施工队提供服务的人工费，材料供应商提供安装服务的收费不参与本次优惠活动。如竣工结算时的应付人工费少于可优惠的金额，则应付人工费全免，且百安居无须向客户退还差额部分。优惠金额不可出售和转让，不可兑换现金，不找零。<br></br>
                            <br></br>
                            5.客户确认，其已清楚理解并完全同意本次活动的活动内容及条件。如客户未能达到本次活动的条件，则客户无法享受相应的优惠活动。<br></br>
                        </div>
                    </div>:null
                }
                {
                    fromIndex==='huanbao'?<div className="qing-ming-coupon">
                        <div className="title">装修现金券</div>
                        <div className="content">
                            全国百安居门店（中型店除外）<br></br>
                            凡在百安居H5报名，且在2020年4月24日至5月06日期间与线下百安居装修设计中心签订定单或合同的客户，可额外获得300元装修券，具体如下：<br></br>
                            1.签定线下个性化装修订单的客户，结算时可额外再减300元应付人工费。<br></br>
                            2.签定装修套餐合同的客户，签约时可额外再减300元合同额。<br></br>
                            <br></br>
                            活动说明<br></br>
                            1.客户在H5上报名后，请妥善保管屏幕显示的凭证串码，在到线下签定单时，需要出示给百安居装修设计中心工作人员，并由工作人员填写在本“确认单”上，方可参加活动。<br></br>
                            <br></br>
                            2.本活动可以与商场同期其他材料零售促销（如有）同享。<br></br>
                            <br></br>
                            3.本活动规则所涉之“决算合同额”指装修竣工决算时，客户实付材料费、实付人工费、实付管理费、实付个性化设计费及测量费的含税金额总和。<br></br>
                            <br></br>
                            4.本活动规则所涉之“应付人工费”仅指在装修施工合同中约定的由百安居装修设计中心施工队提供服务的人工费，材料供应商提供安装服务的收费不参与本次优惠活动。如竣工结算时的应付人工费少于可优惠的金额，则应付人工费全免，且百安居无须向客户退还差额部分。优惠金额不可出售和转让，不可兑换现金，不找零。<br></br>
                            <br></br>
                            5.客户确认，其已清楚理解并完全同意本次活动的活动内容及条件。如客户未能达到本次活动的条件，则客户无法享受相应的优惠活动。<br></br>
                        </div>
                    </div>:null
                }
                
            </span>
        );
    }
}

const mapDispatch = () => {
    return {
    };
};

export default connect(null, mapDispatch)(Detail);
