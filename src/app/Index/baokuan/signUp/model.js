import Service from './service';

export default {
    state: {

    },
    reducers: {

    },
    effects: {
        async asyncSubmitUser(params) {
            const data = await Service.submitUser(params);
            return data;
        },
    },
};
