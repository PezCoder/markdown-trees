import React from 'react';

import Node from './Node.jsx';
import './DirectoryTree.scss';

class DirectoryTree extends React.Component {
  renderTree() {
    const {tree, addNode, renameNode, parentKey} = this.props;
    let composedTree = [];

    for (let node in tree) {
      const nodeKey = (parentKey ? parentKey + '/' : '') + node;
      if (tree[node] === null) {
        composedTree.push(
          <Node key={nodeKey} nodePath={nodeKey} node={node} addNode={addNode} renameNode={renameNode} />
        );
      } else if (typeof tree[node] === "object") {
        composedTree.push(
          <React.Fragment key={nodeKey}>
            <Node key={nodeKey} nodePath={nodeKey} node={node} addNode={addNode} renameNode={renameNode} />
            <DirectoryTree {...this.props} tree={tree[node]} parentKey={nodeKey} />
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
      <section className="each-subtree">
        { this.renderTree() }
      </section>
    );
  }
}

export default DirectoryTree;
