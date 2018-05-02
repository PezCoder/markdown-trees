import React from 'react';
import './DirectoryTree.scss';

class DirectoryTree extends React.Component {
  renderNode(node, addNode, key) {
    return (
      <p key={key}>
        { node }
        <button onClick={() => addNode(key, node)}>+</button>
      </p>
    );
  }

  renderTree() {
    const {tree, addNode, parentKey} = this.props;
    let composedTree = [];

    for (let node in tree) {
      const nodeKey = node + (parentKey ? '/' + parentKey : '');
      if (tree[node] === null) {
        composedTree.push(
          this.renderNode(node, addNode, nodeKey)
        );
      } else if (typeof tree[node] === "object") {
        composedTree.push(
          <React.Fragment key={nodeKey}>
            { this.renderNode(node, addNode, nodeKey) }
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
