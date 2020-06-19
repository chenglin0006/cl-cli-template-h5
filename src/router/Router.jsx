/* eslint-disable react/prop-types */
/**
 * @Description: 定义路由组件
 * @author 王发靖 Fajing.Wang@b-and-qchina.com
 * @date 2019/2/18
*/

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import RouteConfig from './RouterConfig';


export default class RouterGenerator {
    static genRouter() {
        const routers = RouterGenerator.getRouters(RouteConfig);
        return (
            <Switch>
                {
                    routers.map((route) => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        );
                    })
                }
            </Switch>
        );
    }

    static routers = null;

    /**
     *  获取路由
     * @param routerConf
     * @returns {boolean}
     */
    static getRouters(routerConf) {
        if (!RouterGenerator.routers) {
            RouterGenerator.routers = routerConf.map((router) => {
                return {
                    path: router.path,
                    exact: router.exact,
                    main: Loadable({
                        loader: () => { return router.page() || <div>loading。。。</div>; },
                        loading: (props) => {
                            if (props.error) {
                                window.console.error(props.error);
                            }
                            return <div />;
                        },
                        render(loaded, props) {
                            const Component = loaded.default;
                            return <Component {...props} />;
                        },
                    }),
                };
            });
        }
        return RouterGenerator.routers;
    }
}
