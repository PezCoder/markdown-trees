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
  }

  isNodeEditing(node) {
    return node === this.editingNode;
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.renameNode(this.props.nodePath, this.state.name);
  }

  render() {
    const { nodePath, node, addNode, deleteNode } = this.props;

    if (this.state.submitted) {
      return (
        <div className="each-node">
          { node }
          <button onClick={() => addNode(nodePath, this.editingNode)}>+</button>
          <button onClick={() => deleteNode(nodePath)}>❌</button>
        </div>
      );
    }

    return (
      <div>
        { !this.state.submitted && (
          <form onSubmit={this.handleSubmit}>
            <input autoFocus type="text" value={this.state.name} onChange={this.handleChange} />
          </form>
        )}
      </div>
    );
  }
};

export default props => (
  <TreeContext.Consumer>
    {({ addNode, renameNode, deleteNode }) => (
      <Node {...props} addNode={addNode} renameNode={renameNode} deleteNode={deleteNode} />
    )}
  </TreeContext.Consumer>
);
