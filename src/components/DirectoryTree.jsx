import React from 'react';
import './DirectoryTree.scss';
import TreeContext from '../contexts/TreeContext.js';

class DirectoryTree extends React.Component {
  renderNode(node, addNode) {
    return (
      <React.Fragment key={node}>
        <p>{ node }</p>
        <button onClick={addNode}>+</button>
      </React.Fragment>
    );
  }

  renderTree(tree, addNode) {
    let composedTree = [];
    for (let node in tree) {
      if (tree[node] === null) {
        composedTree.push(
          this.renderNode(node, addNode)
        );
      } else if (typeof tree[node] === "object") {
        composedTree.push(
          <React.Fragment key={node}>
            { this.renderNode(node) }
            <DirectoryTree tree={tree[node]} />
          </React.Fragment>
        );
      } else {
        throw new Error('tree node must either be null or an object {}');
      }
    }

    return composedTree;
  }

  render() {
    return (
      <TreeContext.Consumer>
        {({ tree, addNode }) => (
          <section className="each-subtree">
            { this.renderTree(tree, addNode) }
          </section>
        )}
      </TreeContext.Consumer>
    );
  }
}

export default DirectoryTree;
