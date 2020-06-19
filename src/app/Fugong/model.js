import Service from './service';

export default {
    state: {
        hotList: [],
    },
    reducers: {
        setHotList(state, data) {
            return {
                ...state,
                hotList: data,
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

        async asyncGetSkuList(params) {
            const data = await Service.getSkuList(params);
            this.setHotList(data.result.data);
            return data;
        },
    },
};
