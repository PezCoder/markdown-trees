import React from 'react';
import ReactDOM from 'react-dom';
import DirectoryTreeContainer from './DirectoryTreeContainer.jsx';
import MarkdownTree from './MarkdownTree.jsx';
import { TreeProvider } from '../contexts/TreeContext.js';

const App = function() {
  return (
    <TreeProvider>
      <h1>Welcome to Markdown-trees </h1>
      <section className="ui-tree">
        <DirectoryTreeContainer />
        <MarkdownTree />
      </section>
    </TreeProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept(function () {
    window.location.reload();
  });
}
