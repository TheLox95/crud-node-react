import * as React from 'react';
import ProductTable from './ProductTable';
import { Container, Segment, Header } from 'semantic-ui-react';

class Product extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <Segment
                    inverted={true}
                    textAlign="center"
                    vertical={true}
                >
                    <Container text={true}>
                        <Header
                            as="h1"
                            content="Product Company"
                            inverted={true}
                            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '0.2em' }}
                        />
                        <Header
                            as="h2"
                            content="CRUD Interface"
                            inverted={true}
                            style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                        />
                    </Container>
                </Segment>

                <Segment style={{ padding: '4em 0em' }} vertical={true}>
                    <Container text={true}>
                        <ProductTable />
                    </Container>
                </Segment>
            </div>
        );
    }
}

export default Product;