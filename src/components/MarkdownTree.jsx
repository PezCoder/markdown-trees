import React from 'react';
import treeify from 'treeify';
import TreeContext from '../contexts/TreeContext.js';

function MarkdownTree({ tree }) {
  const markdown = treeify.asTree(tree['.']);

  return (
    <pre>
      { markdown }
    </pre>
  );
};

export default props => (
  <TreeContext.Consumer>
    {({ tree }) => (
      <MarkdownTree {...props} tree={tree} />
    )}
  </TreeContext.Consumer>
);
