import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from "../actions";
import Picker from "../components/Picker";

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  }

  render() {
    const { selectSubreddit } = this.props;
    return (
      <div>
        <Picker
          value={selectSubreddit}
          onChange={this.handleChange}
          options={["reactjs", "frontend"]}
        />
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || { isFetching: true, items: [] };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(AsyncApp);
