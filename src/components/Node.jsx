import React from 'react';
import TreeContext from '../contexts/TreeContext.js';

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
      type
    } = this.props;

    return (
      <div className="each-node">
        { type === 'folder' && <i onClick={() => moveNode(nodePath, './ZZZ')} className="fas fa-folder"></i> }
        { type === 'file' && <i onClick={() => moveNode(nodePath, './ZZZ')} className="far fa-file"></i> }
        { this.state.submitted && <p onClick={this.makeNodeEditable}>{ node }</p> }
        { !this.state.submitted && (
          <form onSubmit={this.handleSubmit}>
            <input autoFocus type="text" value={this.state.name} onChange={this.handleChange} onBlur={this.handleSubmit} />
          </form>
        )}
        { this.state.submitted && (
          <React.Fragment>
            <i className="fas fa-plus plus-icon" onClick={() => addNode(nodePath, this.editingNode)} />
            <i className="fas fa-times cross-icon" onClick={() => deleteNode(nodePath)} />
          </React.Fragment>
        )}
      </div>
    );
  }
};

export default props => (
  <TreeContext.Consumer>
    {({ addNode, renameNode, deleteNode, moveNode }) => (
      <Node {...props} addNode={addNode} renameNode={renameNode} deleteNode={deleteNode} moveNode={moveNode} />
    )}
  </TreeContext.Consumer>
);
