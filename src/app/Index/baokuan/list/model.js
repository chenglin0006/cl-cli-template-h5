import Service from './service';

export default {
    state: {

    },
    reducers: {

    },
    effects: {
        async asyncGetBaokuanList(params) {
            const data = await Service.getBaokuanList(params);
            return data;
        },
    },
};
