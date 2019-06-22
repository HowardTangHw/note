import * as React from 'react';
import './App.css';
import { demoHoc } from './hoc';

class App extends React.Component {
  // private leftComp = () => {
  //   return <div>123</div>;
  // };
  public render() {
    return <div className="App">{demoHoc(<div>123</div>, <div>123</div>)}</div>;
  }
}

export default App;
