import Service from './service';

export default {
    state: {

    },
    reducers: {

    },
    effects: {
        async asyncGetTotalNumber(params) {
            const data = await Service.getTotalNumber(params);
            return data;
        },
    },
};
