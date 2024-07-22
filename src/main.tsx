import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

import AuthorizerWithNavigate from "./auth/AuthorizerWithNavigate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthorizerWithNavigate>
      <Provider>
        <App />
      </Provider>
      </AuthorizerWithNavigate>
    </BrowserRouter>
  </React.StrictMode>,
);
