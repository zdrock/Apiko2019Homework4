import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TaskWrapper = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid #ededed;
`;

const TaskContent = styled.div`
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  border: none;
  width: 100%;
  height: 100%;
  padding: 15px 15px 15px 60px;
  box-sizing: border-box;
`;

const DeleteButtonStyled = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  border: 0;
  background: none;
  outline: none;
`;

const StyledCheckbox = styled.button`
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #c4deda;
  outline: none;
  background: none;
  margin-bottom: auto;
  margin-top: auto;
  left: 10px;
  top: 0;
  right: 0;
  bottom: 0;
`;

const CheckmarkStyled = styled.span`
  position: absolute;
  left: 5px;
  top: -1px;
  color: #5dc2af;
  font-size: 24px;
`;

const EditableContent = styled.input.attrs({
  autoFocus: true
})`
  position: relative;
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  border: 1px solid #999999;
  padding: 5px;
  outline: none;
  margin-left: 50px;
  width: 488px;
  height: 45px;
`;

class Task extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onToggleTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
      editedTitle: this.props.title,
      hovered: false
    };

    this.handleToggleTask = this.handleToggleTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleToggleTask(e) {
    this.props.onToggleTask(this.props.id);
  }

  handleDeleteTask() {
    this.props.onDeleteTask(this.props.id);
  }

  handleToggle() {
    this.setState({ toggled: true });
  }

  handleEdit(e) {
    this.setState({ editedTitle: e.target.value });
  }

  handleBlur(e) {
    const { editedTitle } = this.state;
    this.props.onEditTask({ id: this.props.id, title: editedTitle });
    this.setState({ toggled: false });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.handleBlur();
    }
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }

  render() {
    const { checked, title } = this.props;
    const { toggled, editedTitle, hovered } = this.state;

    return (
      <TaskWrapper
        onMouseOver={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {!toggled && (
          <StyledCheckbox onClick={this.handleToggleTask}>
            {checked && <CheckmarkStyled>✓</CheckmarkStyled>}
          </StyledCheckbox>
        )}

        {toggled && (
          <EditableContent
            value={editedTitle}
            onChange={this.handleEdit}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />
        )}

        {!toggled && checked ? (
          <TaskContent onClick={this.handleToggle}>
            <s>{title}</s>
          </TaskContent>
        ) : (
          !toggled && (
            <TaskContent onClick={this.handleToggle}>{title}</TaskContent>
          )
        )}

        {!toggled && hovered && (
          <DeleteButtonStyled onClick={this.handleDeleteTask}>
            ×
          </DeleteButtonStyled>
        )}
      </TaskWrapper>
    );
  }
}

export default Task;
