import { Route, Switch, NavLink } from "react-router-dom";
import React from "react";
import Input from "./Input";
import TasksList from "./TasksList";
import ItemsLeft from "./ItemsLeft";
import { getTasks } from "../actions/tasksActions";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

const AppContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const NavigationContainer = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const FlexStub = styled.div`
  flex-grow: 1;
`;

const NavLinkStyled = styled(NavLink)`
  padding: 3px 7px 20px 5px;
  text-decoration: none;
  color: #777;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  border: 1px solid white;
  border-radius: 3px;
  margin-left: 5px;
  margin-right: 5px;

  :hover {
    border: 1px solid #f7eaea;
  }
  &.active {
    border: 1px solid #efd5d5;
  }
`;

class AppContainer extends React.Component {
  static propTypes = {
    tasksLength: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.props.dispatch(getTasks());
  }

  render() {
    const { tasksLength } = this.props;
    return (
      <AppContainerStyled>
        <Input />

        <Switch>
          <Route exact path="/" component={TasksList} />
          <Route path="/new" component={TasksList} />
          <Route path="/completed" component={TasksList} />
        </Switch>

        {tasksLength > 0 && (
          <NavigationContainer>
            <ItemsLeft />
            <FlexStub />
            <NavLinkStyled exact to="/">
              All
            </NavLinkStyled>
            <NavLinkStyled to="/new"> New </NavLinkStyled>
            <NavLinkStyled to="/completed"> Completed </NavLinkStyled>
            <FlexStub />
          </NavigationContainer>
        )}
      </AppContainerStyled>
    );
  }
}

const mapStateToProps = state => {
  const { tasks } = state.tasks;
  return {
    tasksLength: tasks.length
  };
};

export default connect(
  mapStateToProps,
  null
)(AppContainer);
