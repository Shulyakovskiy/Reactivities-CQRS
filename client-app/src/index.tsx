import * as React from "react";
import {render} from "react-dom";
import App from "./app/layout/App";
import {createBrowserHistory} from "history";
import "./assets/scss/styles.scss";
import "react-toastify/dist/ReactToastify.min.css";
import {Router} from "react-router-dom";
import ScrollToTop from "./app/layout/ScrolToTop";

export const appHistory = createBrowserHistory();

const rootEl = document.getElementById("root");

render(
    <Router history={appHistory}>
        <ScrollToTop>
            <App/>
        </ScrollToTop>
    </Router>
    , rootEl);
