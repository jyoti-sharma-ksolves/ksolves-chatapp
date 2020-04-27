import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import ChatRoom from './ChatRoom';

const PrivateRoute = () => {
    const userInfo = JSON.parse (localStorage.getItem ('document'));
    return (
        <Route render={() => (
            userInfo.result.id ?
                <ChatRoom />
            : <Redirect to="/signin" />
        )} />
    );
}

export default PrivateRoute;
