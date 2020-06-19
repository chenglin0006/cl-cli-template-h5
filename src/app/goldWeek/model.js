import Service from './service';

export default {
    state: {
        qingmingHotList: [],
    },
    reducers: {
        setQingmingHotList(state, data) {
            return {
                ...state,
                qingmingHotList: data,
            };
        },
    },
    effects: {
        async asyncGetTotalNumber(params) {
            const data = await Service.getTotalNumber(params);
            return data;
        },

        async asyncGetCoupon(params) {
            const data = await Service.getCoupon(params);
            return data.result.data;
        },

        async asyncGetQingmingSkuList(params) {
            const data = await Service.getQingmingSkuList(params);
            this.setQingmingHotList(data.result.data);
            return data;
        },
    },
};
