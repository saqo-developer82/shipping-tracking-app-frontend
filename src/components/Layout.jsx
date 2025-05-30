import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <div>
                    <h1>Shipping Tracker</h1>
                    <p>Enter your tracking code to get estimated delivery information</p>
                </div>
            </header>

            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;