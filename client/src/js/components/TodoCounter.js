import React, {Component} from "react"
import {connect} from 'react-redux';

class TodoCounter extends Component {
    render() {
        return (
            <h3>
                Задачи: <span>{this.props.todos.length}</span>
            </h3>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos
});

export default connect(mapStateToProps)(TodoCounter);
