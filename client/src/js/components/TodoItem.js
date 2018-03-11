import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteTodo} from '../actions/todo_actions';

class TodoItem extends Component {
    handleChange = () => this.props.deleteTodo(this.props.todo.id);

    render() {
        if (this.props.size !== 1) {
            return (
                <div id="parent">
                    <div class="inline"><button onClick={this.handleChange}>X</button></div>
                    <div class="inline">{this.props.todo.text}</div>
                </div>
            )
        } else {
            return (
                <div id="parent">
                    <div class="inline">{this.props.todo.text}</div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(
    {deleteTodo},
    dispatch
);

export default connect(null, mapDispatchToProps)(TodoItem);
