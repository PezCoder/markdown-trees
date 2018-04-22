import React from 'react';
import ReactDOM from 'react-dom';
import DirectoryTree from './DirectoryTree.jsx';

const App = function() {
  return (
    <React.Fragment>
      <h1>Welcome to Markdown-trees </h1>
      <DirectoryTree />
    </React.Fragment>
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
