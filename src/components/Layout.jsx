import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <header className="border-b py-6 px-4 md:px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Shipping Tracker
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your tracking code to get estimated delivery information
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6">{children}</main>
    </>
  );
};

export default Layout;
