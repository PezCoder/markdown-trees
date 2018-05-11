import React from 'react';
import ReactDOM from 'react-dom';
import DirectoryTreeContainer from './DirectoryTreeContainer.jsx';
import MarkdownTree from './MarkdownTree.jsx';
import { TreeProvider } from '../contexts/TreeContext.js';

const treeSvg = require('../assets/tree.svg');

const App = function() {
  return (
    <TreeProvider>
      <header>
        <h1 className="main-heading">Markdown</h1>
        <img src={ treeSvg } height="50" />
        <img src={ treeSvg } height="50" />
      </header>
      <h2 className="main-subheading">Create github markdown trees with ease</h2>
      <section className="ui-tree">
        <div className="directory-tree">
          <DirectoryTreeContainer />
        </div>
        <MarkdownTree />
        <footer>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></footer>
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
