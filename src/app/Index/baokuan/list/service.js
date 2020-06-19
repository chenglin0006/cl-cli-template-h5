import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util';

class Service extends CommonService {
    getBaokuanList() {
        return Remote.get('items/list');
    }
}

export default new Service();
