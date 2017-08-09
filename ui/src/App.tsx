import * as React from 'react';
import './semantic.min.css';
import './App.css';
import Products from './components/Products';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Products />
    );
  }
}

export default App;
