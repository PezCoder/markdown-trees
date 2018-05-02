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
      addNode: this.addNode.bind(this),
    };
  }

  /*
   Function uses the pathToAdd to find where the new node needs to be added

   For example:
   {
      parent: {
        child: null,
      }
    }

    pathToAdd: 'parent' represents node needs to be added under parent object
    pathToAdd: 'parent/child' represents node needs to be added under parent[child] object
  */
  addNode(pathToAdd, node) {
    this.setState({
      'tree': this.getNewNodeOnPath(pathToAdd, node),
    });
  }

  getNewNodeOnPath(path, node) {
    const indexOfSeparator = path.indexOf('/');

    // breaking condition
    if (indexOfSeparator === -1) {
      return {
        [path]: {
          [node]: null,
        },
      };
    }

    const leftHalf = path.substring(0, indexOfSeparator);
    const rightHalf = path.substring(indexOfSeparator + 1, path.length);

    return {
      [leftHalf]: this.getNewNodeOnPath(rightHalf, node),
    };
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
