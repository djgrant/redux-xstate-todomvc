import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import TodoTextInput from "./TodoTextInput";
import { completeTodo, editTodo, deleteTodo } from "../actions";
import { matchesState } from "xstate";

class TodoItem extends Component {
  // handleSave(id, text) {
  //   if (text.length === 0) {
  //     this.props.deleteTodo(id);
  //   } else {
  //     this.props.editTodo(id, text);
  //   }
  //   this.setState({ editing: false });
  // }

  render() {
    const { todo, relatedTodo, completed, editing } = this.props;
    const dispatch = (type, data) =>
      this.props.dispatch({ type, id: todo.id, ...data });

    let element;
    if (editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={text => dispatch("SAVE_TODO", { text })}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => completeTodo(todo.id)}
          />
          <label onDoubleClick={() => dispatch("DOUBLE_CLICK_TODO")}>
            {todo.text} {relatedTodo && relatedTodo.isCompleted ? "(+)" : "(-)"}
          </label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return <li className={classnames({ completed, editing })}>{element}</li>;
  }
}
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editing: PropTypes.bool,
  completed: PropTypes.bool
};

const makeMapStateToProps = (initialState, initialProps) => {
  const { id } = initialProps;
  const mapStateToProps = state => {
    const { todos } = state;
    const todo = todos.byId[id].data;
    const statechart = todos.byId[id].statechart;
    const relatedTodo = todo.relatedId && todos.byId[todo.relatedId].data;
    return {
      todo,
      relatedTodo,
      editing: matchesState("edit", statechart),
      completed: matchesState("view.complete", statechart)
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TodoItem);
