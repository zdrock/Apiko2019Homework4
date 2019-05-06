import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleAll } from "../actions/tasksActions";
import styled from "styled-components";

const ButtonToggleStyled = styled.button`
    position:absolute; 
    border: none; 
    background: none;    
    font-size: 22px;
    color:${props => (props.checked ? "#737373" : "#e6e6e6")}; 
    padding-left:25px
    padding-bottom:10px
    transform: rotate(90deg);
    outline:none;
`;

class ToggleAllCheckboxComponent extends React.Component {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    onToggleAll: PropTypes.func.isRequired,
    itemsLeft: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleToggleAll = this.handleToggleAll.bind(this);
  }

  handleToggleAll() {
    this.props.onToggleAll();
  }

  render() {
    const { tasks, itemsLeft } = this.props;
    if (tasks.length === 0) {
      return null;
    }
    return (
      <ButtonToggleStyled
        onClick={this.handleToggleAll}
        checked={itemsLeft === 0}
      >
        ❯
      </ButtonToggleStyled>
    );
  }
}

const mapStateToProps = state => {
  const { tasks } = state.tasks;
  const itemsLeft = tasks.filter(t => !t.checked).length;
  return {
    tasks,
    itemsLeft
  };
};

const mapDispatchToProps = dispatch => ({
  onToggleAll: () => dispatch(toggleAll())
});

const ToggleAllCheckbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleAllCheckboxComponent);

export default ToggleAllCheckbox;
