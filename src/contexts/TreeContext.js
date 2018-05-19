import React from 'react';
import deepmerge from 'deepmerge';
import { unset, cloneDeep } from 'lodash';

const initialTreeState = {
  '.': null,
};
const TreeContext = React.createContext(initialTreeState);

export class TreeProvider extends React.Component {
  constructor() {
    super();

    this.storageKey = 'markdown_tree';
    const anySavedTree = JSON.parse(localStorage.getItem(this.storageKey));

    this.state = {
      tree: anySavedTree || initialTreeState,
      addNode: this.addNode.bind(this),
      renameNode: this.renameNode.bind(this),
      deleteNode: this.deleteNode.bind(this),
    };
  }

  // Syncing every state update to local storage
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state.tree));
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

    /*
      Why deepmerge ?
      setState() does a shallow merging of object & not deep
      for ex:
      State Tree:
      {
        a: {
          b: null,
        }
      }

      For addNode('a','c');
      treeWithNewNode will be:
      {
        a: {
          c: null,
        }
      }

      calling setState(treeWithNewNode) directly will result in losing node b i.e
      It'll replace the whole a key's value with whatever is present in treeWithNewNode
    */
    this.setState({
      'tree': deepmerge(this.state.tree, treeWithNewNode),
    });
  }

  /*
    Renames a node, this is done in two steps:
    1. Clone the node that needs to be renamed by the new name as a sibling
    2. Delete the node that needs to be renamed

    For ex:
    State tree:
    {
      a: {
        b: null/object,
      }
    }

    renameNode('a/b', z)

    State of tree after Point 1:
    {
      a: {
        b: null/object,
        z: null/object,
      }
    }

    State of tree after Point 2:
    {
      a: {
        z: null/object,
      }
    }
  */
  renameNode(pathToRename, node) {
    const treeWithNewRenamedNode = this.recurseThroughTree(
      this.state.tree,
      pathToRename,
      ( treeNode, lastNode ) => ({
        // if renaming a non-leaf tree node, maintain it's child heirarchy
        // else set it to null
        [node]: treeNode ? treeNode : null,
      })
    );

    const stateTreeWithRenamedNode = deepmerge(this.state.tree, treeWithNewRenamedNode);
    unset(stateTreeWithRenamedNode, pathToRename.split('/'));

    this.setState({
      'tree': stateTreeWithRenamedNode,
    });
  }

  deleteNode(pathToDelete) {
    const treeWithDeletedNode = cloneDeep(this.state.tree);
    unset(treeWithDeletedNode, pathToDelete.split('/'));

    this.setState({
      'tree': treeWithDeletedNode,
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

  recurseThroughTree(tree, path, breakingConditionCallback) {
    const indexOfSeparator = path.indexOf('/');

    // breaking condition
    if (indexOfSeparator === -1) {
      return breakingConditionCallback(tree[path], path);
    }

    const leftHalf = path.substring(0, indexOfSeparator);
    const rightHalf = path.substring(indexOfSeparator + 1, path.length);

    return {
      [leftHalf]: this.recurseThroughTree(
        tree[leftHalf],
        rightHalf,
        breakingConditionCallback
      ),
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
