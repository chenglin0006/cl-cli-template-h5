/* eslint-disable no-unused-expressions */
/**
 * @Description: 定义远程访问组件
 * @author wangfajing
 * @date 2019/4/11
*/

import Axios from 'axios';
import _forEach from 'lodash.foreach';
import _isEmpty from 'lodash.isempty';
import { Toast } from 'antd-mobile';
import Device from './Device';
import Config from '../../config/index';

class Remote {
    constructor() {
        this.axios = Axios.create();
        this.initInterceptors();
        this.sources = [];
        this.CancelToken = Axios.CancelToken;
    }

    /**
     * 初始化全局拦截器
     */
    initInterceptors = () => {
        this.axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                try {
                    return Promise.reject(error.response.data);
                } catch (e) {
                    // 处理超时
                    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') >= 0) {
                        // 覆盖超时信息
                        error.message = '请求超时，请刷新页面';
                    }
                    // 处理取消请求等错误
                    return Promise.reject(error);
                }
            },
        );
    };

    /**
     * 删去已经完成的promise对应的key
     */
    delCancelHandler = (key) => {
        this.sources = this.sources.filter((source) => {
            return source.key !== key;
        });
    };

    /**
     * 生成cancelToken或者超时设置
     */
    genCancelConf = (key) => {
        const config = {};
        const keyType = typeof key;
        // key为string类型并且重复了，则直接返回空对象
        // key为number类型是设置超时，所以重复了不影响请求
        if (keyType === 'string' && !this.checkKey(key)) {
            return config;
        }

        if (keyType === 'string' && key) {
            // 处理取消请求
            const token = new this.CancelToken((c) => {
                this.sources.push({
                    key,
                    cancel: c,
                });
            });
            config.cancelToken = token;
            config.key = key;
        } else if (keyType === 'number') {
            // 处理超时
            config.timeout = key;
        }
        return config;
    };

    /**
     * 通过key来找到token
     */
    findSource = (key) => {
        return this.sources.find((s) => {
            return s.key === key;
        });
    };

    /**
     * 检查key是否重复
     */
    checkKey = (key) => {
        return this.findSource(key) === undefined;
    };

    /**
     * 取消掉请求
     */
    cancel = (key, msg = '用户手动取消') => {
        const source = this.findSource(key);

        if (source) {
            source.cancel(msg);
            this.delCancelHandler(key);
        }
    };

    static METHOD = {
        GET: 'GET',
        POST: 'POST',
    };

    /**
     * @Description: 打开传进来的域名，并附带相应参数，主要涉及到导出业务
     * @author wangfajing
     * @date 2019-05-13
    */
    open = (url, data) => {
        let sendURL = `${this.genDomainForEnv('default')}${url}`;
        const dealData = {};
        _forEach(data, (val, key) => {
            if (!(typeof val === 'undefined' || val === '')) {
                dealData[key] = val;
            }
        });
        const queryData = `?data=${JSON.stringify(dealData)}`;
        sendURL += queryData;
        window.open(encodeURI(sendURL));
    };

    /**
     * @Description: 打开传进来的域名，并附带相应参数，主要涉及到导出业务
     * @author wangfajing
     * @date 2019-05-13
    */
    openGet = (url, data) => {
        let sendURL = `${this.genDomainForEnv('default')}${url}`;
        sendURL += this.genQuery(data);
        window.open(sendURL);
    };

    /**
     * get请求
     */
    get = (url, data, option = {
        urlType: 'default',
        key: null,
        isShowPermissionPage: false,
    }) => {
        return new Promise((resolve, reject) => {
            return this.http(
                Remote.METHOD.GET,
                `${this.genDomainForEnv(option.urlType)}${url}`,
                data,
                'json',
                option.key,
                option.isShowPermissionPage,
            ).then((res) => {
                resolve(res);
            }, (error) => {
                reject(error);
                Toast.fail(error.reason);
            });
        });
    };

    /**
     * post请求
     */
    post = (url, data, option = {
        urlType: 'default',
        key: null,
        isShowPermissionPage: false,
        type: 'json',
        isShowRejectMsg: true,
    }) => {
        let isShowRejectMsg = true;
        if (option && option.isShowRejectMsg === false) {
            isShowRejectMsg = false;
        }
        return new Promise((resolve, reject) => {
            return this.http(
                Remote.METHOD.POST,
                `${this.genDomainForEnv(option.urlType)}${url}`,
                data,
                option.type,
                option.key,
                option.isShowPermissionPage,
            ).then((res) => {
                resolve(res);
            }, (error) => {
                reject(error);
                isShowRejectMsg ? Toast.fail(error.reason) : '';
            });
        });
    };

    /**
     * HTTP 请求远端数据。
     * @return Promise
     */
    http = (method, url, data, type = 'json', key, isShowPermissionPage) => {
        if (!url) return null;
        const send = this.axios.request;
        const config = this.getHttpConfig(method, url, data, type, this.genCancelConf(key));
        return new Promise((resolve, reject) => {
            send(config).then((resp) => {
                const respData = resp.data;
                this.delCancelHandler(config.key);
                let code = respData.error === undefined ? respData.code : respData.error;
                let msg = '';
                if (respData && respData.response && respData.response.code === 0) {
                    code = 0;
                }
                switch (code) {
                    case '0':
                    case 0:
                        resolve(respData);
                        break;
                    default:
                        switch (code) {
                            case -1:
                                msg = '账号未登录';
                                window.location.href = '/login';
                                break;
                            case -2:
                                msg = '用户无权限操作';
                                if (isShowPermissionPage) {
                                    window.location.href = '/permission';
                                }
                                break;
                            case 400:
                                msg = '错误请求';
                                break;
                            case 401:
                                msg = '未授权，请重新登录';
                                break;
                            case 403:
                                msg = '拒绝访问';
                                break;
                            case 404:
                                msg = '请求错误,未找到该资源';
                                break;
                            case 405:
                                msg = '请求方法未允许';
                                break;
                            case 408:
                                msg = '请求超时';
                                break;
                            case 500:
                                msg = '服务器端出错';
                                break;
                            case 501:
                                msg = '网络未实现';
                                break;
                            case 502:
                                msg = '网络错误';
                                break;
                            case 503:
                                msg = '服务不可用';
                                break;
                            case 504:
                                msg = '网络超时';
                                break;
                            case 505:
                                msg = 'http版本不支持该请求';
                                break;
                            default:
                                msg = respData.msg || '异常错误';
                        }
                        reject({
                            error: -100,
                            code: respData.code,
                            reason: msg,
                            data: respData.data,
                        });
                }
            }).catch((err) => {
                reject({
                    error: -1,
                    reason: `网络异常或服务器错误: [${err.message || err.msg}]`,
                });
            });
        });
    };

    /**
     * 获取http请求配置
     */
    getHttpConfig = (method, url, data, type, specificConf) => {
        let sendURL = url;
        const config = Object.assign({}, {
            url: sendURL,
            withCredentials: true,
            method,
        }, specificConf);
        if (method === Remote.METHOD.GET) {
            sendURL += this.genQuery(data);
            config.url = sendURL;
        } else {
            let contentType = '';
            let cfgData = data;
            switch (type) {
                case 'json':
                    contentType = 'application/json';
                    _forEach(data, (val, key) => {
                        if (val === '' || val === undefined) {
                            delete data[key];
                        }
                    });
                    cfgData = JSON.stringify(data || {});
                    break;
                case 'file':
                    contentType = 'multipart/form-data';
                    cfgData = new FormData();
                    _forEach(data, (val, key) => {
                        cfgData.append(key, val);
                    });
                    break;
                case 'formData':
                    contentType = 'application/x-www-form-urlencoded';
                    config.transformRequest = [(requestData) => {
                        let ret = '';
                        let index = 0;
                        _forEach(requestData, (v, k) => {
                            ret += `${index === 0 ? '' : '&'}${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
                            index += 1;
                        });
                        return ret;
                    }];
                    break;
                default:
                    break;
            }
            config.headers = { 'Content-Type': contentType };
            config.data = cfgData;
        }
        return config;
    };

    /**
     * 获取当前所处环境。
     * 通过配置node环境变量来获取
     * 暂定
     * 开发环境： development
     * 线上环境： production
     * @return string
     */
    getEnv = () => {
        return process.env.CURRENT_ENV || 'production';
    };

    /**
     * 定义生成http query string的方法
     * @param queryData Object query参数
     * @return string query字符串
     */
    genQuery = (queryData) => {
        if (_isEmpty(queryData)) return '';
        let ret = '';
        // 防止IE接口缓存，加上时间戳
        if (Device.isIE()) queryData.timestamp = new Date().getTime();
        _forEach(queryData, (val, key) => {
            if (typeof val !== 'undefined') {
                ret += `&${key}=${encodeURIComponent(val)}`;
            }
        });
        return ret.replace(/&/, '?');
    };

    /**
     *  依照环境生成域名
     *  @return string
     */
    genDomainForEnv = (type) => {
        const env = this.getEnv();
        const typeJson = {
            locationApi: `${Config[env].locationUrl}${Config[env].locationFilter}`,
            skuApi: `${Config[env].skuUrl}${Config[env].skuFilter}`,
            default: `${Config[env].apiUrl}${Config[env].apiUrlFilter}`,
            auth: `${Config[env].authUrl}${Config[env].authUrlFilter}`,
            skuDetailApi: `${Config[env].skuDetailUrl}${Config[env].skuDetailFilter}`,
            qingmingApi: `${Config[env].qingmingApi}`,
            loginApi: `${Config[env].loginApi}`,
        };
        return typeJson[type];
    };
}

const remote = new Remote();
export default {
    get: remote.get,
    post: remote.post,
    cancel: remote.cancel,
    open: remote.open,
    openGet: remote.openGet,
    getEnv: remote.getEnv,
};
