"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const App_1 = require("./App");
const registerServiceWorker_1 = require("./registerServiceWorker");
require("./index.css");
ReactDOM.render(<App_1.default />, document.getElementById('root'));
registerServiceWorker_1.default();
