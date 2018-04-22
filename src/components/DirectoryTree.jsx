import React from 'react';

class DirectoryTree extends React.Component {
  renderTree(tree)
  {
    const composedTree;
    for (node in tree) {
      if (tree[node] === null) {
        composedTree += (
          <p>{tree}</p>
        );
      } else if (typeof tree[node] === "object") {
        <DirectoryTree tree={tree[node]}
      }
    }
  }

  render() {
    const tree = this.props.tree;
    return (
      { this.renderTree(tree) }
    );
  }
}
