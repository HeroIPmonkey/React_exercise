import React from 'react'
import TodosList from "./TodosList";
import Header from "./Header"
import InputTodo from "./InputTodo"
import {v4 as uuidv4} from "uuid";
class TodoContainer extends React.Component {
  state = {
    todos: [
      // {
      //   id: uuidv4(),
      //   title: "Setup development environment",
      //   completed: true
      // },
      // {
      //   id: uuidv4(),
      //   title: "Develop website and add content",
      //   completed: false
      // },
      // {
      //   id: uuidv4(),
      //   title: "Deploy to live server",
      //   completed: false
      // }
    ]
  };
  handleChange = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return{
            ...todo,
            completed: !todo.completed,
          }
          
        }
        return todo;
      })
    });
  };
  delTodo = id => {
    this.setState({
      todos:[
        ...this.state.todos.filter(todo=>{
          return todo.id !== id;
        })
      ]
    });
  };
  addTodoItem = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };
  setUpdate = (updateTitle,id)=>{
    this.setState({
      todos: this.state.todos.map(todo=>{
        if(todo.id === id){
          todo.title = updateTitle
        }
        return todo
      })
    })
  }
  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/todos?limit=10")
  //     .then(response => response.json())
  //     .then(data => this.setState({ todos: data }));
  // }
  componentDidMount() {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }
  render(){
    return(
      // <div>
      //   <h1>Hello from Create React App</h1>
      //   <p>I am in a react Component!</p>
      // </div>
      // <React.Fragment>
      //   <h1>Hello from Create React App</h1>
      //   <p>I am in a React Component!</p>
      // </React.Fragment>
      // <ul>
      //   {this.state.todos.map(todo => (
      //     <li>{todo.title}</li>
      //   ))}
      // </ul>
      <div className="container">
        <div className = "inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList 
            todos={this.state.todos} 
            handleChangeProps={this.handleChange}
            deleteTodoProps = {this.delTodo} 
            setUpdate = {this.setUpdate}
          />
        </div>
      </div>
    )
  }
}

export default TodoContainer

// localStorage.setItem("key", "value")
// localStorage.setItem("todos", "data")
// localStorage.getItem("key")
// localStorage.getItem("todos")
// const obj = {
//   id: 1,
//   title: "Setup development environment",
//   completed: true,
// }
// localStorage.setItem("myItem", JSON.stringify(obj))
// localStorage.getItem("myItem")
// JSON.parse(localStorage.getItem("myItem"))
// localStorage.removeItem("key")
// localStorage.removeItem("myItem")
// localStorage.clear()