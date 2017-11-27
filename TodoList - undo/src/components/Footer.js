import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Footer extends Component {
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name;
    }

    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          this.props.onFilterChange(filter);
        }}
      >
        {name}
      </a>
    );
  }

  renderFilters() {
    return (
      <p>
        Show: {this.renderFilter("SHOW_ALL", "ALL")}
        {", "}
        {this.renderFilter("SHOW_COMPLETED", "Completed")}
        {", "}
        {this.renderFilter("SHOW_ACTIVE", "Active")}
        .
      </p>
    );
  }

  renderUndo() {
    return (
      <p>
        <button onClick={this.props.onUndo} disabled={this.props.undoDisabled}>
          Undo
        </button>
        <button onClick={this.props.onRedo} disabled={this.props.redoDisabled}>
          Redo
        </button>
      </p>
    );
  }

  render() {
    return (
      <div>
        {this.renderFilters()}
        {this.renderUndo()}
      </div>
    );
  }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf(["SHOW_ALL", "SHOW_COMPLETED", "SHOW_ACTIVE"])
    .isRequired
};
