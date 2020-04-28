import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import ChatRoom from './ChatRoom';

const PrivateRoute = ({component: Component, ...props}) => {
    const userInfo = JSON.parse (localStorage.getItem ('document'));
    return (
        <Route {...props} render={innerProps => (
            userInfo ?
                (<ChatRoom {...innerProps} />)
            : (<Redirect to="/signin" />)
        )} />
    );
}

export default PrivateRoute;
