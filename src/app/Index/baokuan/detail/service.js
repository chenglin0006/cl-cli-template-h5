import CommonService from '../../../../service/CommonService';
import { Remote } from '../../../../util';

class Service extends CommonService {
    getBaokuanDetail(params) {
        return Remote.get('/new/detail/queryBySapSkuNoAndShopCode', params, {
            urlType: 'skuDetailApi',
        });
    }
}

export default new Service();
