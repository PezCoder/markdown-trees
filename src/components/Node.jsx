import React from 'react';

export default class Node extends React.Component {
  constructor(props) {
    super(props);

    this.placeholderNode = '__PLACEHOLDER__';
    this.state = {
      name: this.isNodePlaceholder(props.node) ? '' : props.node,
      submitted: this.isNodePlaceholder(props.node) ? false : true,
    };
    console.log('initial state',this.state);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isNodePlaceholder(node) {
    return node === this.placeholderNode;
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.renameNode(this.props.nodePath, this.state.name);
  }

  render() {
    const { nodePath, node, addNode } = this.props;

    if (this.state.submitted) {
      return (
        <React.Fragment>
          { node }
          <button onClick={() => addNode(nodePath, '__PLACEHOLDER__')}>+</button>
        </React.Fragment>
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
