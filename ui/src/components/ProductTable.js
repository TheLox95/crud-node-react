"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const editIcon = require('../Black_pencil.svg');
const delteIcon = require('../trashcan.svg');
const semantic_ui_react_1 = require("semantic-ui-react");
class ProductRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
                <td className="rowMenu">
                    <div className="ui grid">
                        <div className="left floated eight wide column">
                            <semantic_ui_react_1.Modal trigger={<img src={editIcon} className="icon" alt="Delete"/>}>
                                <semantic_ui_react_1.Modal.Header>Select a Photo</semantic_ui_react_1.Modal.Header>
                                <semantic_ui_react_1.Modal.Content>
                                    <semantic_ui_react_1.Modal.Description>
                                        <semantic_ui_react_1.Header>Product Information</semantic_ui_react_1.Header>
                                        <semantic_ui_react_1.Form>
                                            <semantic_ui_react_1.Form.Field>
                                                <label>Product Name</label>
                                                <input value={this.props.product.name}/>
                                            </semantic_ui_react_1.Form.Field>
                                            <semantic_ui_react_1.Form.Field>
                                                <label>Price</label>
                                                <input value={this.props.product.price}/>
                                            </semantic_ui_react_1.Form.Field>
                                            <semantic_ui_react_1.Form.Field>
                                                <label>Category</label>
                                                <semantic_ui_react_1.Dropdown placeholder="Select Friend" fluid selection options={[
            {
                text: 'Jenny Hess',
                value: 'Jenny Hess',
                image: { avatar: true, src: '/assets/images/avatar/small/jenny.jpg' },
            }
        ]}/>
                                            </semantic_ui_react_1.Form.Field>
                                            <semantic_ui_react_1.Button type="submit">Submit</semantic_ui_react_1.Button>
                                        </semantic_ui_react_1.Form>
                                    </semantic_ui_react_1.Modal.Description>
                                </semantic_ui_react_1.Modal.Content>
                            </semantic_ui_react_1.Modal>
                        </div>
                        <div className="right floated eight wide column">
                            <img src={delteIcon} className="icon" alt="Delete"/>
                        </div>
                    </div>
                </td>
            </tr>);
    }
}
// tslint:disable-next-line:max-line-length
class ProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    }
    getData(val) {
        this.setState({ modalIsOpen: val });
    }
    render() {
        var rows = [];
        this.props.products.forEach(function (product) {
            // tslint:disable-next-line:max-line-length
            rows.push(<ProductRow product={product} key={product.name}/>);
        });
        return (<table className="ui celled teal table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>);
    }
}
exports.default = ProductTable;
