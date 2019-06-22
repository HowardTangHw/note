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

interface fcProps {
  abcd?: string;
  leftComp?: React.ReactNode;
  rightComp?: React.ReactNode;
}
export const demoFunctionComp: React.FC<fcProps> = props => {
  return (
    <div>
      <div>{props.leftComp}</div>
      <div>{props.children}</div>
    </div>
  );
};
