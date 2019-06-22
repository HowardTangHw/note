import * as React from 'react';
export function DemoHoc(leftComp: React.ReactNode, RightComp: React.ReactNode) {
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

interface fcProps extends React.FC {
  abcd?: string;
}
export const demoFunctionComp: fcProps = props => {
  return <div>123 {props.children}</div>;
};
