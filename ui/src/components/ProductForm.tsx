import * as React from 'react';
import { Modal, Icon, Button, Form, Message, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { CategoryInterface } from './ProductTable';

interface ProductFormState {
    modalOpen: boolean;
    createSuccess: boolean;
    name: string;
    price: number;
    category: CategoryInterface;
    validationErrors: {
        thereAreErrors: boolean,
        nameError: boolean,
        priceError: boolean,
        categoryError: boolean
    };
}

interface ProductProps {
    categoriesDropOptions: Map<number, { text: string; value: number }>;
    onCreated: Function;
}

export default class ProductForm extends React.Component<ProductProps, ProductFormState> {

    validationErrors = {
        thereAreErrors: false,
        nameError: false,
        priceError: false,
        categoryError: false
    };

    constructor(props: ProductProps) {
        super(props);

        this.state = {
            modalOpen: false,
            createSuccess: false,
            name: '',
            price: 0,
            category: {
                id: 0,
                name: ''
            },
            validationErrors: {
                thereAreErrors: false,
                nameError: false,
                priceError: false,
                categoryError: false
            }
        };
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

    async handleChange(e: any) {
        const name = e.target.name;
        const value = e.target.value;

        await this.changeState(name, value);
        await this.changeState('createSuccess', false);
        this.validateData(name);
    }

    handleDropdownChange(e: React.SyntheticEvent<HTMLElement>, data: any) {
        let name = '';
        const categoryName = this.props.categoriesDropOptions.get(data.value);
        if (categoryName) {
            name = categoryName.text;
        }
        this.setState({
            category: {
                id: data.value,
                name
            },
            createSuccess: false
        });
    }

    async submit(e: {}) {
        this.validateData('name');
        this.validateData('price');
        this.validateData('category');

        try {
            const productData = {
                name: this.state.name,
                price: this.state.price,
                category: this.state.category.id,
            };

            const productUpdateRes = await axios.post(`http://127.0.0.1:4000/products/create`, productData);

            const categoryOption = this.props.categoriesDropOptions.get(this.state.category.id);
            let categoryName = '';

            if (categoryOption) {
                categoryName = categoryOption.text;
            }

            const productCreated = {
                id: productUpdateRes.data.id,
                name: this.state.name,
                price: this.state.price,
                category: {
                    id: this.state.category.id,
                    name: categoryName,
                }
            };

            if (productUpdateRes.status === 200) {
                this.setState({ createSuccess: true });
                this.resetForm();
                this.props.onCreated(productCreated);
            }

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { name, price } = this.state;

        return (
            <Modal
                trigger={
                    <Button floated="right" size="small" primary={true} ><Icon name="add" /> Add Product</Button>}
                onClose={() => this.handleModalClose()}
            >
                <Modal.Header>Edit</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={(e) => this.submit(e)} >
                        <Message
                            error={true}
                            visible={this.state.validationErrors.thereAreErrors}
                            header="There are errors in the form"
                            content="Corrent the errors to upload the from"
                        />
                        <Message
                            success={true}
                            visible={this.state.createSuccess}
                            header="Product Created!"
                            content="The product was created succesfully"
                        />
                        <Form.Field>
                            <Form.Input
                                label="Product Name"
                                name="name"
                                onChange={(e) => this.handleChange(e)}
                                error={this.state.validationErrors.nameError}
                                value={name}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label="Price"
                                name="price"
                                onChange={(e) => this.handleChange(e)}
                                error={this.state.validationErrors.priceError}
                                value={price}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <Dropdown
                                error={this.state.validationErrors.categoryError}
                                fluid={true}
                                selection={true}
                                options={Array.from(this.props.categoriesDropOptions.values())}
                                onChange={(e, obj) => this.handleDropdownChange(e, obj)}
                                onClose={(e, obj) => this.validateData('category')}
                            />
                        </Form.Field>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }

        resetForm() {
        this.setState({
            name: '',
            price: 0,
            category: {
                id: 0,
                name: '',
            },
            validationErrors: {
                thereAreErrors: false,
                nameError: false,
                priceError: false,
                categoryError: false
            }
        });
    }

    handleModalClose() {
        this.setState({
            modalOpen: false,
            createSuccess: false,
            name: '',
            price: 0,
            category: {
                id: 0,
                name: '',
            },
            validationErrors: {
                thereAreErrors: false,
                nameError: false,
                priceError: false,
                categoryError: false
            }
        });
    }

    validateData(dataName: string) {
        switch (dataName) {
            case 'name':
                if (this.state.name === '') {
                    this.validationErrors.nameError = true;
                    this.validationErrors.thereAreErrors = true;
                    this.setState({ validationErrors: this.validationErrors });
                } else {
                    this.validationErrors.thereAreErrors = false;
                    this.validationErrors.nameError = false;
                    this.setState({ validationErrors: this.validationErrors });
                }

                break;
            case 'price':
                console.log(this.state.price);
                if (isNaN(this.state.price) === true || this.state.price === 0) {
                    this.validationErrors.priceError = true;
                    this.validationErrors.thereAreErrors = true;
                    this.setState({ validationErrors: this.validationErrors });
                } else {
                    this.validationErrors.priceError = false;
                    this.validationErrors.thereAreErrors = false;
                    this.setState({ validationErrors: this.validationErrors });
                }
                break;
            case 'category':
                if (this.state.category.id === 0) {
                    this.validationErrors.categoryError = true;
                    this.validationErrors.thereAreErrors = true;
                    this.setState({ validationErrors: this.validationErrors });
                } else {
                    this.validationErrors.thereAreErrors = false;
                    this.validationErrors.categoryError = false;
                    this.setState({ validationErrors: this.validationErrors });
                }
                break;
            default:
                break;
        }
    }
}