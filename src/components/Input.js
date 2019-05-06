import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTask } from "../actions/tasksActions";
import styled from "styled-components";
import ToggleAllCheckbox from "./ToggleAllCheckbox";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #ededed;
`;

const InputStyled = styled.input`
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  border: none;
  width: 100%;
  height: 100%;
  padding: 16px 16px 16px 60px;
  box-sizing: border-box;
  outline: none;
  &::-webkit-input-placeholder {
    color: grey;
  }
`;

class InputComponent extends React.Component {
  static propTypes = {
    onCreateTask: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onSubmit() {
    if (this.validate()) {
      return;
    }
    const { value } = this.state;
    this.props.onCreateTask(value);
    this.setState({ value: "" });
  }

  onKeyDown(e) {
    if (e.key === "Enter") {
      this.onSubmit();
    }
  }

  validate() {
    const { value } = this.state;

    if (!value) return true;
    return false;
  }

  render() {
    return (
      <InputWrapper>
        <ToggleAllCheckbox />
        <InputStyled
          value={this.state.value}
          placeholder="What needs to be done?"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </InputWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onCreateTask: title => dispatch(createTask(title))
});

const Input = connect(
  null,
  mapDispatchToProps
)(InputComponent);

export default Input;
