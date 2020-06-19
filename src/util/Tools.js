/* jshint esversion: 6 */
/*eslint-disable */
import * as __URL__ from '../../config/index';
import React from "react";
import $ from 'jquery'
import Config from '../../config/index';
import wx from 'weixin-js-sdk';
import BMap  from 'BMap';

const ENV = process.env.CURRENT_ENV || 'production';
var wxConfigObj = {
    title: 'demo',
    desc: 'demo',
    url: Config[ENV].pageUrl+'/index',
    imgUrl: 'demo',
};

export default class Tools {
    /**
     * 对下拉菜单的数据进行处理，以满足Select公共控件对于字段的要求
     * MakeSearch中select的字段类型为[name, id]
     * @param data 原始数据
     * @param maps 字段匹配配置 {key: [] || '' }
     *  key为数组时，按照数组中拿到的第一个有数据的字段来处理
     *  例如后端数据格式为{ name: xxx, id: 1, code: 'x111'}
     *  传入maps {id: ['code', id]} 则在后端数据code有值时使用code code无数据时使用id
     * @returns {{name: *, id: *}[]}
     */
    static mapSelect = (data = [], maps = {}) => {
        return data.map((item) => {
            let name = 'name';
            let id = 'id';
            if (Array.isArray(maps.name)) {
                name = maps.name.find((findItem) => {
                    return Boolean(item[findItem]);
                });
            } else if (typeof maps.name === 'string') {
                name = maps.name;
            }
            if (Array.isArray(maps.id)) {
                id = maps.id.find((findItem) => {
                    return Boolean(item[findItem]);
                });
            } else if (typeof maps.id === 'string') {
                id = maps.id;
            }
            return {
                name: item[name],
                id: item[id],
            };
        });
    };
    /**
     * 生成tabal的columns方法
     * @param options  [{
     *     name: string.isRequired
     * }]，需传递name dataindex
     * @returns {*}
     */
    static genTableOptions = (options) => {
        return options.map((item) => {
            return {
                ...item,
                title: item.name,
                dataIndex: item.dataindex,
                key: item.dataindex,
                width: item.width || 120,
                className: 'tableStyle',
                render: typeof item.render === 'function' && item.render,
            };
        });
    };

    static createUrl = (request) => {
        let { url } = request;
        const { param } = request;

        if (param) {
            url = !url.includes('?') && `${url}?`;
            for (const key of Object.keys(param)) {
                url = `${url + key}=${encodeURI(param[key])}&`;
            }
            if (url.endsWith('&')) {
                url = url.substring(0, url.length - 1);
            }
        }
        return url;
    };

    static getUrlArg = (name, isSearchFromCookies) => {
        let { search } = window.location;
        // IE9(通过window.history.replaceState来判断IE9和其他浏览器，不考虑IE8及以下浏览器)时，search的值从cookie中获取
        if (isSearchFromCookies && !window.history.replaceState) {
            search = unescape(getCookie('CURRENT_SEARCH'));
        }
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const arg = search.substr(1).match(reg);
        return arg ? arg[2] : '';
    };

    static getCookie = (cookieName) => {
        const cookieStr = decodeURI(document.cookie);
        const arr = cookieStr.split('; ');
        let cookieValue = '';
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i].split('=');
            if (temp[0] == cookieName) {
                cookieValue = temp[1];
                break;
            }
        }
        return decodeURI(cookieValue);
    };

    static setCookie = (name, value) => {
        const days = 30;
        const exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
    }

    // 检查手机号码格式
    static checkPhone(mobile) {
        return /^1[1|2|3|4|5|6|7|8|9]\d{9}$/.test(mobile);
    }

    static getLocationFun = (callback) => {
        var map = new BMap.Map("mapContainer");
        // 创建地图实例  
        var point = new BMap.Point(316.404, 39.915);
        // 创建点坐标  
        map.centerAndZoom(point, 15);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            debugger;
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                console.log('您的位置：'+r.point.lng+','+r.point.lat);
                callback({latitude:r.point.lat,longitude:r.point.lng})
            }
            else {
                callback({errFlag:1});
            }        
        });
    }

    //深拷贝
    static deepClone = (obj) => {
        var str, newobj =  obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(obj), //序列化对象
                newobj = JSON.parse(str); //还原
        } else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
            }
        }
        return newobj;
    }

    //判断字符串/数组/对象/不为空时返回true
    static isNotNull = (obj) => {
        if (obj instanceof Object) {
            for (var a in obj) {
                return true;
            }
            return false;
        }
        return typeof(obj) != 'undefined' && obj !== null && (Array.isArray(obj) ? obj.length !== 0 : obj !== "");
    };

    static getEnv = () => {
        return process.env.CURRENT_ENV || 'production';
    };

    static getWxData = (fromIndex) =>{
        //配置微信分享
        var wxData = {
            signature: '',
            appId: '',
            nonceStr: '',
            timestamp: ''
        };
        var url = location.href;
        $.ajax({
            url: "https://zt.api.bnq.com.cn/bnq_owner/apis/common/wechat/public/htmlSign.share?htmlUrl=" + encodeURIComponent(url),
            dataType: 'json',
            method: 'get',
            success: function (data) {
                if (data.response.code == 0) {
                    wxData.signature = data.response.data.signature;
                    wxData.appId = data.response.data.appId;
                    wxData.nonceStr = data.response.data.noncestr;
                    wxData.timestamp = data.response.data.timestamp;
                    wx.config({
                        debug: false,
                        appId: wxData.appId,
                        timestamp: wxData.timestamp,
                        nonceStr: wxData.nonceStr,
                        signature: wxData.signature,
                        jsApiList: ['checkJsApi',
                            'openLocation',
                            'getLocation',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                        ]
                    });
                    wx.ready(function () {
                        if(fromIndex === 'qingming'){
                            wxConfigObj = {
                                title: '踏青小长假，装修正当时',
                                desc: '即日起至4月6日，家装、建材海量优惠等你来抢！',
                                url: Config[ENV].pageUrl+'/qingming',
                                imgUrl: 'https://res1.bnq.com.cn/57bbf6ca-e16b-4645-8b9f-f422025b888a?t=1585288656997',
                            };
                        } else if(fromIndex === 'fugong'){
                            wxConfigObj = {
                                title: '装修复工第一战',
                                desc: '10亿补贴惠全国，签家装尊享六重好礼，购建材力度再升级。会员独享优惠券，还有300元家装礼金等你来领！',
                                url: Config[ENV].pageUrl+'/fugong',
                                imgUrl: 'https://res1.bnq.com.cn/a5c88fd7-ab0a-49df-9d99-bcb720561f24?t=1586222498522',
                            };
                        } else if(fromIndex === 'goldWeek'){
                            wxConfigObj = {
                                title: '五一黄金周，团购工厂价',
                                desc: '百大装修建材品牌联盟，签家装尊享六重礼，购建材满额送高达550全场礼金，节日专享超级团购疯狂6天，精选人气爆款抢券折上折！',
                                url: Config[ENV].pageUrl+'/goldWeek',
                                imgUrl: 'http://storage.bthome.com/activity/huangjinzhou/fenxiang.jpeg',
                            };
                        } else if(fromIndex === 'huanbao'){
                            wxConfigObj = {
                                title: 'demo',
                                desc: 'demo',
                                url: Config[ENV].pageUrl+'/huanbao',
                                imgUrl: 'demo',
                            };
                        }
                        //分享朋友圈
                        wx.onMenuShareTimeline({
                            title: wxConfigObj.title,
                            desc: wxConfigObj.desc,
                            link: wxConfigObj.url,
                            imgUrl: wxConfigObj.imgUrl,
                            success: function () {
                            },
                            cancel: function () {
                            }
                        });
                        //分享朋友
                        wx.onMenuShareAppMessage({
                            title: wxConfigObj.title,
                            desc: wxConfigObj.desc,
                            link: wxConfigObj.url,
                            imgUrl: wxConfigObj.imgUrl,
                            success: function () {
                            },
                            cancel: function () {
                            }
                        });
                        wx.error(function (res) {
                        });
                        wx.checkJsApi({
                            jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: function (res) {
                                // 以键值对的形式返回，可用的api值true，不可用为false
                                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                            }
                        });
                    });
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

    static getCouponFun = (params,callBack,sessionToken) => {
        let url = "http://wxadmin.market.bnq.com.cn/wx-web/public/web/getVerifyCode.do"
        let env = process.env.CURRENT_ENV;
        if(env === 'development' || env === 'prodDev'){
            url = "http://wxadmin-dev.market.bnq.com.cn/wx-web/public/web/getVerifyCode.do"
        }
        $.ajax({
            method: 'post',
            url: url,
            data: JSON.stringify({
                data: params
            }),
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (request) {
                if(sessionToken) {
                    request.setRequestHeader("sessionToken", sessionToken);
                } else {
                    request.setRequestHeader("sessionToken", '');
                }
            },
            crossDomain: true,
            contentType: "application/json",
            success: function (data, textStatus, request) {
                callBack(data);
            }
        });
    }
}
