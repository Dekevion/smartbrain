import React, {Component} from 'react';
import 'tachyons';

const Navigation = ({onRouteChange,isSignedIn}) => {
    if (isSignedIn) {
        return(
        <nav style={{display: 'flex, justifyContent: flex-end'}}>
            <p onClick={() => onRouteChange('signout')}>Sign Out</p>
        </nav>
        );

    } else {
        return (
            <nav>
                <p onClick={() => onRouteChange('sign_in')}>Sign In</p>
                <p onClick={() => onRouteChange('register')}>Register</p>

            </nav>


        );
    }
};
export default Navigation;