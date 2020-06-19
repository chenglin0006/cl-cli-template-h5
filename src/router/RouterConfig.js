export default [{
    path: '/index',
    exact: true,
    text: '首页',
    page: () => { return import('../app/Index'); },
}];
