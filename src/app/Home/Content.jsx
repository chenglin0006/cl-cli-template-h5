import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Router from '../../router/Router';

@withRouter
class Contents extends Component {
    static propTypes = {
    };

    static defaultProps = {
        location: {},
    };

    render() {
        return (
            <Fragment>
                {Router.genRouter()}
            </Fragment>
        );
    }
}

export default Contents;
