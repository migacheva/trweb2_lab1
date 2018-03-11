import React, {Component} from "react"
import {Link} from "react-router-dom";
import TodoItem from './TodoItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load, removeAll, search} from '../actions/todo_actions';

class TodoList extends Component {
    state = {query: ''};

    changeText = evt => {
        this.setState({query: evt.target.value}, () => {
            const query = this.state.query;
            if (query) {
                this.props.search(query);
            } else {
                this.props.load();
            }
        });
    };

    componentDidMount = () => {
        this.props.load();
    };

    render() {
        let list = !this.props.isLoading && !this.props.isError ? (
            <ul id="todos" >
                {
                    this.props.todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} size={this.props.todos.length}/>)
                    )
                }
            </ul>
        ) : this.props.isError ? (
            <div role="alert">
                Задачи не загружены. Попробуйте еще раз.
            </div>
        ) : (
            <div>
                <p>Загрузка...</p>
            </div>
        );
        return (
            <div>
                <div >
                    <input id="searchInput"
                           type="text"
                           placeholder="Поиск задачи"
                           aria-label="Поиск задачи"
                           aria-describedby="basic-addon2"
                           value={this.state.query}
                           disabled={this.props.isLoading}
                           onChange={this.changeText}/>
                </div>
                {list}
                <Link
                      role='button'
                      to="/add"
                      disabled={this.props.isLoading}>
                    Добавить новую задачу
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading,
    isError: state.isError
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {load, removeAll, search},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
