import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util';

class Service extends CommonService {
    submitUser(params) {
        return Remote.post('/app/appExpoInterest/create', params, {
            isShowRejectMsg: false,
            urlType: 'default',
            key: null,
            isShowPermissionPage: false,
            type: 'json',
        });
    }
}

export default new Service();
