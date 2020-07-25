import * as React from "react";
import { render } from "react-dom";
import App from "./app/layout/App";
import "./app/layout/styles.scss";

const rootEl = document.getElementById("root");

render(<App />, rootEl);
