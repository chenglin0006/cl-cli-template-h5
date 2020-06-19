import CommonService from '../../service/CommonService';
import { Remote } from '../../util';

class Service extends CommonService {
    getTotalNumber() {
        return Remote.get('/app/appExpoInterest/countOrderByWay/1242');
    }
}

export default new Service();
