import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { createApiClient } from "./utils";
import { useApiClient } from "./hooks";

import "./assets/fonts/sf-ui-display-cufonfonts-webfont/style.css";
import "./style.css";

const queryClient = new QueryClient();
const apiClient = createApiClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <useApiClient.Provider client={apiClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </useApiClient.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
