import * as React from 'react';
import axios from 'axios';
const editIcon = require('../img/Black_pencil.svg');
import { Header, Modal, Table, Grid, Message } from 'semantic-ui-react';
import UpdateForm from './UpdateForm';
import DeleteModal from './DeleteModal';
import ProductForm from './ProductForm';

interface RowProps {
    product: {
        id: number,
        price: number,
        name: string,
        category: {
            id: number,
            name: string
        }
    };
    onDeleted: Function;
    onUpdated: Function;
    categoriesDropOptions: Map<number, { text: string; value: number }>;
}

class ProductRow extends React.Component<RowProps, {}> {

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.product.name}</Table.Cell>
                <Table.Cell>{this.props.product.price}</Table.Cell>
                <Table.Cell className="rowMenu">
                    <Grid className="ui grid">
                        <Grid.Column className="left floated eight wide column">
                            <Modal trigger={<img src={editIcon} className="icon" alt="Delete" />}>
                                <Modal.Header>Edit</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Header>Product Information</Header>
                                        <UpdateForm
                                            product={this.props.product}
                                            categoriesDropOptions={this.props.categoriesDropOptions}
                                            updatedHandler={this.props.onUpdated}
                                        />
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </Grid.Column >
                        <Grid.Column className="right floated eight wide column">
                            <DeleteModal
                                productId={this.props.product.id}
                                handler={this.props.onDeleted}
                            />
                        </Grid.Column >
                    </Grid>
                </Table.Cell>
            </Table.Row>
        );
    }

}

export interface ProductInterface {
    id: number;
    name: string;
    price: number;
    category: CategoryInterface;
}

export interface CategoryInterface {
    id: number;
    name: string;
}

interface State {
    products: ProductInterface[];
    categories: CategoryInterface[];
    deleteSuccess: boolean;
}

export default class ProductTable extends React.Component<{}, State> {
    _dropdownCategory: Map<number, { text: string; value: number }> = new Map();

    constructor(props: {}) {
        super(props);

        this.state = {
            deleteSuccess: false,
            products: [],
            categories: []
        };

    }

    async componentDidMount() {
        const productsRes = await axios.get(`http://127.0.0.1:4000/products`);
        let productsArr: ProductInterface[] = [];

        for (const product of productsRes.data.products) {
            productsArr.push({
                id: product.id,
                name: product.name,
                price: product.price,
                category: {
                    id: product.categoryInfo.id,
                    name: product.categoryInfo.name,
                }
            });
        }

        const categoriesRes = await axios.get(`http://127.0.0.1:4000/categories`);
        let categoriesArr: CategoryInterface[] = [];

        for (const category of categoriesRes.data.categories) {
            categoriesArr.push({ id: category.id, name: category.name });
        }

        this.setState({ categories: categoriesArr, products: productsArr });
    }

    handleCreate(productCreated: ProductInterface) {
        const products = this.state.products;
        products.push(productCreated);
        this.setState({ products });
    }

    async changeState(name: string, value: any) {
        return new Promise((resolve, rejected) => {
            const state = {};
            state[name] = value;

            this.setState(state, () => {
                return resolve();
            });
        });
    }

    async handleUpdate(productCreated: ProductInterface) {       
        const products = this.state.products.filter((product: ProductInterface) => {
            return product.id !== productCreated.id;
        });
        products.push(productCreated);

        await this.changeState( 'products' , products);
        this.forceUpdate();        
    }

    handleDelete(id: number) {
        const products = this.state.products.filter((product: ProductInterface) => {
            return product.id !== id;
        });

        this.setState({ products: products, deleteSuccess: true });
        this.forceUpdate();

        setTimeout(() => {
            this.setState({ deleteSuccess: false });
        }, 4000);
    }

    render() {
        const rows: {}[] = [];
        this.state.products.forEach((product: ProductInterface) => {
            rows.push(
                <ProductRow
                    product={product}
                    categoriesDropOptions={this._dropdownCategory}
                    onDeleted={(id: number) => this.handleDelete(id)}
                    onUpdated={(product: ProductInterface) => this.handleUpdate(product)}
                />
            );
        });

        for (const category of this.state.categories) {
            this._dropdownCategory.set(category.id, { text: category.name, value: category.id });
        }

        return (
            <div>
                <Table celled={true} padded={true}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{rows}</Table.Body>
                    <Table.Footer fullWidth={true}>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan="2">
                                <ProductForm
                                    categoriesDropOptions={this._dropdownCategory}
                                    onCreated={(product: ProductInterface) => this.handleCreate(product)}
                                />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <Message success={true} hidden={!this.state.deleteSuccess}>
                    Product Deleted
                </Message>
            </div>
        );
    }

}