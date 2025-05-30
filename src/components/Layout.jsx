import React from 'react';
const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Shipping Tracker
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Enter your tracking code to get estimated delivery information
                    </p>
                </div>
            </header>
            📦
            <main className="max-w-4xl mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-white border-t mt-12">
                <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500">
                    <p>© 2025 Shipping Tracker.</p>
                </div>
            </footer>
        </div>
    );
};
export default Layout;