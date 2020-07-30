import * as React from "react";
import {render} from "react-dom";
import App from "./app/layout/App";
import "./assets/scss/styles.scss";
import {BrowserRouter} from "react-router-dom";
import ScrollToTop from "./app/layout/ScrolToTop";

const rootEl = document.getElementById("root");

render(
    <BrowserRouter>
        <ScrollToTop>
            <App/>
        </ScrollToTop>
    </BrowserRouter>
    , rootEl);
