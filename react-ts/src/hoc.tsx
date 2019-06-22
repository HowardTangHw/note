import * as React from 'react';
export function demoHoc(leftComp: React.ReactNode, RightComp: React.ReactNode) {
  return class extends React.Component {
    public render() {
      return (
        <div>
          {leftComp}
          {RightComp}
        </div>
      );
    }
  };
}

interface ddd extends React.FC {
  abcd?: string;
}
export const demoFunctionComp: ddd = props => {
  return <div>123 {props.children}</div>;
};
