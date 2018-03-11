import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTodo} from '../actions/todo_actions';

class TodoInput extends Component {
    state = {value: ''};

    disabled = () => this.props.todos.length >= 10;

    changeText = evt => this.setState({value: evt.target.value});

    handleAdd = () => {
        if (this.state.value.trim() === '') {
            alert('Введите название задачи!');
            return;
        }
        this.props.addTodo(this.state.value);
        this.setState({value: ''})
    };

    handlePress = (e) => {
        if (e.key === 'Enter') {
            this.handleAdd();
        }
    };

    render() {
        return (
            <div className="container">
                <div >
                    <input id="title"
                           type="text"
                           placeholder="Введите заголовок задачи"
                           aria-label="Введите заголовок задачи"
                           aria-describedby="basic-addon2"
                           value={this.state.value}
                           disabled={this.disabled()}
                           onKeyPress={this.handlePress}
                           onChange={this.changeText}/>
                        <button
                            disabled={this.disabled()}
                            onClick={this.handleAdd}>Добавить
                        </button>
                </div>
                <br/>
                <div>
                    <Link role='button' to="/">&lt;&lt; Вернуться к списку задач</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {addTodo},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
