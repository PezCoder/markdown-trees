import React from 'react';

const initialTreeState = {
  '.': null,
};
const TreeContext = React.createContext(initialTreeState);

export class TreeProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      tree: initialTreeState,
      addNode: this.addNode,
    };
  }

  addNode() {
    console.log('adding node');
  }

  render() {
    return (
      <TreeContext.Provider value={this.state}>
        {this.props.children}
      </TreeContext.Provider>
    );
  }
}

export default TreeContext;
