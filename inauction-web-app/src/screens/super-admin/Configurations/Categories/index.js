import React, { Component } from "react";
// import ReactStickies from 'react-stickies';
import Auxiliary from "../../../../util/Auxiliary";
import { connect } from 'react-redux';
import { onGetCategories } from "../../../../iNRedux/actions/Categories";

class Categories extends Component {

  componentDidMount() {
    this.props.onGetCategories();
  }

  onChange = (categories) => {
    console.log("categories: ", categories)
  };

  render() {
    const {categoriesList} = this.props;
    return (
        <Auxiliary>
          {/*<ReactStickies*/}
          {/*    notes={categoriesList}*/}
          {/*    onChange={this.onChange}*/}
          {/*/>*/}
        </Auxiliary>
    );
  }
}

function mapStateToProps({categories}) {
  const {categoriesList} = categories;
  return {categoriesList};
}

export default connect(mapStateToProps, {onGetCategories})(Categories);



