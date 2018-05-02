import React from 'react';
import DirectoryTree from './DirectoryTree.jsx';
import TreeContext from '../contexts/TreeContext.js';

export default function DirectoryTreeContainer() {
  return (
      <TreeContext.Consumer>
        {treeContext => (
          <DirectoryTree {...treeContext} />
        )}
      </TreeContext.Consumer>
  );
};
