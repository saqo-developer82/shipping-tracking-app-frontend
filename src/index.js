import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "sonner";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          content: "text-red-500 text-lg",
        },
      }}
      theme="light"
      duration={3000}
      style={{
        color: "red",
      }}
      icons={{
        error: (
          <img
            loading="lazy"
            width={60}
            height={60}
            src="/error.svg"
            alt="Error"
            title="Error"
          />
        ),
      }}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
