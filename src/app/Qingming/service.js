import CommonService from '../../service/CommonService';
import { Remote } from '../../util';

class Service extends CommonService {
    getTotalNumber() {
        return Remote.get('/app/appExpoInterest/countOrderByWay/1245');
    }

    getCoupon(params) {
        return Remote.post('/public/activity20200401/login', params, {
            urlType: 'qingmingApi',
            isShowRejectMsg: false,
            type: 'formData',
        });
    }

    getQingmingSkuList(params) {
        return Remote.get('/public/activity20200401/list', params, {
            urlType: 'qingmingApi',
        });
    }
}

export default new Service();
