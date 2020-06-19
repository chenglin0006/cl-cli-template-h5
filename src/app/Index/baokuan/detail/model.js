import Service from './service';

export default {
    state: {
        detailInfo: {

        },
    },
    reducers: {
        setData(state, data) {
            return {
                ...state,
                detailInfo: data,
            };
        },
    },
    effects: {
        async asyncGetBaokuanDetail(params) {
            const data = await Service.getBaokuanDetail(params);
            console.log(data, '999999999999999999');
            if (data && data.result && data.result.data && data.result.data.skuList) {
                const detailData = data.result.data.skuList.map((item, index) => {
                    if (item.sapSkuNo == params.sapSkuNo) {
                        return item;
                    }
                });
                detailData.forEach((item, index) => {
                    if (item) {
                        this.setData(item);
                    }
                });
            }
            return data;
        },
    },
};
