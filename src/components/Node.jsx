import React from 'react';
import TreeContext from '../contexts/TreeContext.js';
import classNames from 'classnames';

class Node extends React.Component {
  constructor(props) {
    super(props);

    this.editingNode = '--editing--';
    this.state = {
      name: this.isNodeEditing(props.node) ? '' : props.node,
      submitted: this.isNodeEditing(props.node) ? false : true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.makeNodeEditable = this.makeNodeEditable.bind(this);
  }

  isNodeEditing(node) {
    return node === this.editingNode;
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // if node name hasn't changed
    if (this.props.node === this.state.name) {
      this.setState({
        submitted: true,
      });
      return;
    }

    this.props.renameNode(this.props.nodePath, this.state.name);
  }

  makeNodeEditable() {
    this.setState({
      submitted: false,
    });
  }

  render() {
    const {
      nodePath,
      node,
      addNode,
      deleteNode,
      moveNode,
      initiateMoveNode,
      moveNodePath,
      type
    } = this.props;

    const eachNodeClass = classNames(
      {
        'each-node': true,
        'moving': moveNodePath === nodePath,
      }
    );
    return (
      <div className={eachNodeClass}>
        { type === 'folder' && <i className="fas fa-folder"></i> }
        { type === 'file' && <i className="far fa-file"></i> }
        { this.state.submitted && <p onClick={this.makeNodeEditable}>{ node }</p> }
        { !this.state.submitted && (
          <form onSubmit={this.handleSubmit}>
            <input autoFocus type="text" value={this.state.name} onChange={this.handleChange} onBlur={this.handleSubmit} />
          </form>
        )}
        { this.state.submitted && !moveNodePath && (
          <React.Fragment>
            <i className="fas fa-plus plus-icon" onClick={() => addNode(nodePath, this.editingNode)} />
            <i className="fas fa-times cross-icon" onClick={() => deleteNode(nodePath)} />
            <i className="fas fa-arrows-alt icon-move" onClick={() => initiateMoveNode(nodePath)} />
          </React.Fragment>
        )}
        { moveNodePath && nodePath.indexOf(moveNodePath) === -1 && (
          <i className="fas fa-arrow-left icon-move" onClick={() => moveNode(moveNodePath, nodePath)} />
        )}
      </div>
    );
  }
};

export default props => (
  <TreeContext.Consumer>
    {({ addNode, renameNode, deleteNode, moveNode, initiateMoveNode, moveNodePath }) => (
      <Node {...props} addNode={addNode} renameNode={renameNode} deleteNode={deleteNode} moveNode={moveNode} initiateMoveNode={initiateMoveNode} moveNodePath={moveNodePath} />
    )}
  </TreeContext.Consumer>
);
