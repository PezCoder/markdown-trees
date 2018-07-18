import React from 'react';
import treeify from 'treeify';
import TreeContext from '../contexts/TreeContext.js';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class MarkdownTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedToClipboard: false,
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipboard() {
    this.setState({ copiedToClipboard: true });
    setTimeout(() => {
      this.setState({ copiedToClipboard: false });
    }, 1000);
  }

  render() {
    const markdown = treeify.asTree(this.props.tree['.']);
    const clipboardMarkdown = '```\n' + markdown + '\n```';

    return (
      <div className="markdown-tree">
        <CopyToClipboard text={clipboardMarkdown}
          onCopy={ this.copyToClipboard }>
          <button disabled={this.state.copiedToClipboard} onClick={ this.copyToClipboard }>
            { this.state.copiedToClipboard
              ? <i className="fas fa-check"></i>
              : 'Copy'
            }
          </button>
        </CopyToClipboard>

        <pre>{ markdown }</pre>
      </div>
    );
  }
}

export default props => (
  <TreeContext.Consumer>
    {({ tree }) => (
      <MarkdownTree {...props} tree={tree} />
    )}
  </TreeContext.Consumer>
);
