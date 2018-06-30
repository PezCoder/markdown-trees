import React from 'react';

import Node from './Node.jsx';
import './DirectoryTree.scss';

class DirectoryTree extends React.Component {
  renderTree() {
    const {tree, parentKey} = this.props;
    let composedTree = [];

    for (let node in tree) {
      const nodeKey = (parentKey ? parentKey + '/' : '') + node;
      if (tree[node] === null) {
        composedTree.push(
          <Node key={nodeKey} nodePath={nodeKey} node={node} type="file" />
        );
      } else if (typeof tree[node] === "object") {
        composedTree.push(
          <div className="each-node-subtree" key={nodeKey}>
            <Node key={nodeKey} nodePath={nodeKey} node={node} type="folder" />
            <DirectoryTree {...this.props} tree={tree[node]} parentKey={nodeKey} />
          </div>
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
