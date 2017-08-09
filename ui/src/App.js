"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./semantic.min.css");
require("./App.css");
const Products_1 = require("./components/Products");
class App extends React.Component {
    render() {
        return (<div className="">
        <div className="ui middle aligned center aligned grid">
          <Products_1.default />
        </div>
        
      </div>);
    }
}
exports.default = App;
