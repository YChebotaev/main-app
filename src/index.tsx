import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { Main } from "./pages/Main";
import { Investments } from "./pages/Investments";
import { Round } from './pages/Round'
import reportWebVitals from "./reportWebVitals";

import "./assets/fonts/sf-ui-display-cufonfonts-webfont/style.css";
import "./style.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/investments/round" element={<Round />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
