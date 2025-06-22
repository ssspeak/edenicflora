import React, { useEffect, useState } from 'react';

// import Components
import TopBar from './TopBar';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        fetch('/menus-json')
            .then(res => res.json())
            .then(data => setMenus(data));
    }, []);

    return (
        <>
            <TopBar />
            <Header />
            <NavigationBar menus={menus} />
            <main className='container-fluid'>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
