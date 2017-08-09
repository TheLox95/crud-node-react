import * as React from 'react';
import { Form, Button, Dropdown, Input, Message } from 'semantic-ui-react';
import axios from 'axios';
import { CategoryInterface } from './ProductTable';

interface UpdateFormInterface {
    product: {
        id: number,
        price: number,
        name: string,
        category: CategoryInterface
    };
    categoriesDropOptions: Map<number, {
        text: string;
        value: number
    }>;
    updatedHandler: Function;
}

interface PropsFormUpdate {
    id: number;
    updateSuccess: boolean;
    price: number;
    name: string;
    category: CategoryInterface;
}

export default class UpdateForm extends React.Component<UpdateFormInterface, PropsFormUpdate> {

    constructor(props: UpdateFormInterface) {
        super(props);

        this.state = {
            'id': this.props.product.id,
            'name': this.props.product.name,
            'price': this.props.product.price,
            'category': {
                id: this.props.product.category.id,
                name: this.props.product.category.name
            },
            'updateSuccess': false
        };
    }

    async submitUpdate(e: {}) {
        try {
            const productData = {
                id: this.state.id,
                name: this.state.name,
                price: this.state.price,
                category: this.state.category.id
            };
            console.log('category' + productData.category);
            console.log('categorystate ' + this.state.category.id);
            
            const productUpdateRes = await axios.put(`http://127.0.0.1:4000/products/update`, {
                id: this.state.id,
                name: this.state.name,
                price: this.state.price,
                category: this.state.category.id
            });

            console.log(productUpdateRes);

            if (productUpdateRes.status === 200) {
                this.setState({ updateSuccess: true });
                this.props.updatedHandler(this.state);
            }

        } catch (error) {
            console.log(error.response.data);
        }
    }

    handleChange(e: any) {
        this.setState({ [e.target.name]: e.target.value, updateSuccess: false });
    }

    handleDropdownChange(e: React.SyntheticEvent<HTMLElement>, data: any) {
        let name = '';
        const categoryName = this.props.categoriesDropOptions.get(data.value);
        if (categoryName) {
            name = categoryName.text;
        }

        this.setState({
            updateSuccess: false, category: {
                id: data.value,
                name
            }
        });
    }

    render() {
        return (
            <Form onSubmit={(e) => this.submitUpdate(e)} >
                <Message
                    success={true}
                    visible={this.state.updateSuccess}
                    header="Product Update!"
                    content="The product was update succesfully"
                />
                <Form.Field>
                    <label>Product Name</label>
                    <Input value={this.state.name} name="name" onChange={(e) => this.handleChange(e)} />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <Input value={this.state.price} name="price" onChange={(e) => this.handleChange(e)} />
                </Form.Field>
                <Form.Field>
                    <label>Category</label>
                    <Dropdown
                        defaultValue={this.props.product.category.id}
                        fluid={true}
                        selection={true}
                        options={Array.from(this.props.categoriesDropOptions.values())}
                        onChange={(e, obj) => this.handleDropdownChange(e, obj)}
                    />
                </Form.Field>
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}