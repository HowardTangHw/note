import * as React from 'react';
import './App.css';
import { DemoHoc } from './hoc';

let C = DemoHoc(<div>123</div>, <div>123</div>);
class App extends React.Component {
  // private leftComp = () => {
  //   return <div>123</div>;
  // };
  public render() {
    return <div>{<C />}</div>;
  }
}

export default App;
