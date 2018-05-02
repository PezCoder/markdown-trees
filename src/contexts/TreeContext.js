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
      renameNode: this.renameNode.bind(this),
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
    const treeWithNewNode = this.recurseThroughPath(pathToAdd, lastNode => ({
      [lastNode]: {
        [node]: null,
      },
    }));

    this.setState({
      'tree': treeWithNewNode,
    });
  }

  renameNode(pathToAdd, node) {
    const treeWithRenamedNode = this.recurseThroughPath(pathToAdd, lastNode => ({
      [node]: null,
    }));

    this.setState({
      'tree': treeWithRenamedNode,
    });
  }

  // Recurses through the path, creates a object while doing so
  // breakingConditionCallback: function that gets executed on the last
  // node in the path, that gives handle to the calling function to decide
  // what to do with the last node
  recurseThroughPath(path, breakingConditionCallback) {
    const indexOfSeparator = path.indexOf('/');

    // breaking condition
    if (indexOfSeparator === -1) {
      return breakingConditionCallback(path);
    }

    const leftHalf = path.substring(0, indexOfSeparator);
    const rightHalf = path.substring(indexOfSeparator + 1, path.length);

    return {
      [leftHalf]: this.recurseThroughPath(rightHalf, breakingConditionCallback),
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
