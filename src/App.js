import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import MainRoute from './Routes/MainRoute';
import { Provider } from 'react-redux'
import store from './Redux/Store/store';

class App extends Component {
  render() {
    return (
      
      <Provider store={store}>
     <MainRoute>

     </MainRoute>
     </Provider>
    );
  }
}

export default App;
