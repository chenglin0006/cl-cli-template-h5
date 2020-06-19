export default [{
    path: '/index',
    exact: true,
    text: '首页',
    page: () => { return import('../app/Index'); },
}, {
    path: '/vrdetail',
    exact: true,
    text: 'vr',
    page: () => { return import('../app/Index/vr/vrDetail'); },
}, {
    path: '/zhuangxiudetail',
    exact: true,
    text: '装修',
    page: () => { return import('../app/Index/zhuangxiu/detail'); },
}, {
    path: '/jiancaidetail',
    exact: true,
    text: '建材',
    page: () => { return import('../app/Index/jiancai/detail'); },
}, {
    path: '/jiazhuangdetail',
    exact: true,
    text: '家装',
    page: () => { return import('../app/Index/jiazhuang/jzDetail'); },
}, {
    path: '/fengshuidetail',
    exact: true,
    text: '风水',
    page: () => { return import('../app/Index/fengshui/fsDetail'); },
}, {
    path: '/yuanchuangdetail',
    exact: true,
    text: '原创',
    page: () => { return import('../app/Index/yuanchuang/ycDetail'); },
}, {
    path: '/yuanchuangdetail/:type',
    exact: true,
    text: '原创',
    page: () => { return import('../app/Index/yuanchuang/ycDetailDetail'); },
}, {
    path: '/signup',
    exact: true,
    text: '报名',
    page: () => { return import('../app/Index/baokuan/signUp/index'); },
}, {
    path: '/brand',
    exact: true,
    text: '品牌',
    page: () => { return import('../app/Index/brand/brandList'); },
}, {
    path: '/brand/detail/:id',
    exact: true,
    text: '品牌',
    page: () => { return import('../app/Index/brand/brandDetail'); },
}, {
    path: '/baokuan',
    exact: true,
    text: '爆款秒杀',
    page: () => { return import('../app/Index/baokuan/list/index'); },
}, {
    path: '/jialiao',
    exact: true,
    text: '加料',
    page: () => { return import('../app/Index/jialiao/detail'); },
}, {
    path: '/baokuan/detail',
    exact: true,
    text: '爆款详情',
    page: () => { return import('../app/Index/baokuan/detail/index'); },
}, {
    path: '/baokuan/signUp',
    exact: true,
    text: '报名秒杀',
    page: () => { return import('../app/Index/baokuan/signUp/index'); },
}, {
    path: '/shopinfo',
    exact: true,
    text: '门店信息',
    page: () => { return import('../app/Index/shopInfo/index'); },
}, {
    path: '/couponinfo',
    exact: true,
    text: '优惠信息',
    page: () => { return import('../app/Index/couponInfo/index'); },
}, {
    path: '/error',
    exact: true,
    text: 'sku',
    page: () => { return import('../app/Index/error/index'); },
}, {
    path: '/qingming',
    exact: true,
    text: 'qingming',
    page: () => { return import('../app/Qingming/index'); },
}, {
    path: '/qingming/login',
    exact: true,
    text: 'qingming',
    page: () => { return import('../app/Login/index'); },
}, {
    path: '/login',
    exact: true,
    text: '登录',
    page: () => { return import('../app/Login/index'); },
}, {
    path: '/qingming/success',
    exact: true,
    text: '清明活动领券成功',
    page: () => { return import('../app/Qingming/success/index'); },
}, {
    path: '/coupon5/success',
    exact: true,
    text: '领券成功',
    page: () => { return import('../app/Qingming/success/index'); },
}, {
    path: '/fugong',
    exact: true,
    text: '复工',
    page: () => { return import('../app/Fugong/index'); },
}, {
    path: '/goldWeek',
    exact: true,
    text: '黄金周',
    page: () => { return import('../app/goldWeek/index'); },
}, {
    path: '/huanbao',
    exact: true,
    text: '环保',
    page: () => { return import('../app/huanbao/index'); },
}];
