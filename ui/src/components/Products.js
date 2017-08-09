"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const axios_1 = require("axios");
const ProductTable_1 = require("./ProductTable");
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productArray: []
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const productsRes = yield axios_1.default.get(`http://127.0.0.1:4000/products`);
            let obj = [];
            // tslint:disable-next-line:max-line-length
            const res = { name: productsRes.data.products[0].name, price: productsRes.data.products[0].price };
            obj.push(res);
            this.setState({ productArray: obj });
            console.log(productsRes);
        });
    }
    render() {
        return (<div className="ProductList column">
                <ProductTable_1.default products={this.state.productArray}/>
            </div>);
    }
}
exports.default = Product;
