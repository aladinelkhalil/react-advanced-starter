import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

// Uncomment an example to run it.
import { App } from "./1_useReducer";
// import { App } from "./2_useTask";
// import { App } from "./3_useFetch";
// import { App } from "./4_errorBoundary";
// import { App } from "./5_performance";
// import { App } from "./6_dataFetching";

// import { App } from "./7_react18/useDeferredValue";
// import { App } from "./7_react18/suspense";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
