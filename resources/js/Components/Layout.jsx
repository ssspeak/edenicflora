import React from 'react';

// import Components
import TopBar from './TopBar';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <TopBar />
            <Header />
            <NavigationBar />
            <main className='container-fluid'>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
