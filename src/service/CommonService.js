import { Remote } from '../util';

class CommonService {
    delay = (time) => {
        return new Promise((resolve) => {
            return setTimeout(() => {
                return resolve();
            }, time);
        });
    };

    getSkuList(params) {
        return Remote.get('/list', params, {
            urlType: 'skuApi',
        });
    }

    submitUser(params) {
        return Remote.post('/app/appointment/create', params);
    }

    getCityTarget(params) {
        return Remote.get('/api/area/get-loc-and-cities.do', params, {
            urlType: 'locationApi',
        });
    }
}

export default CommonService;
