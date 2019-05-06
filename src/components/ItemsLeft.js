import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const ItemsLeftStyled = styled.span`
  float: left;
  text-align: left;
  color: #777;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial;
`;

const ItemsLeftComponent = ({ itemsLeft }) => (
  <ItemsLeftStyled>{itemsLeft} items left</ItemsLeftStyled>
);

const mapStateToProps = state => {
  const { tasks } = state.tasks;
  const itemsLeft = tasks.filter(t => !t.checked).length;
  return {
    itemsLeft
  };
};

const ItemsLeft = connect(
  mapStateToProps,
  null
)(ItemsLeftComponent);

export default ItemsLeft;
