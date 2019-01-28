import React from 'react';
import TopNav from '../TopNav/TopNav';

export const Layout = (props) => {
    return <div className="container">
        <TopNav />
        {props.children}
    </div>
}