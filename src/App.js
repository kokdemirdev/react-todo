import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';

import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {Button, Input, InputGroup, ListGroup, ListGroupItem} from "reactstrap";

const getInitialTodos = () => {
  const _todos = localStorage.getItem('todos')
  if (_todos) {
    return JSON.parse(_todos)
  } else {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState(getInitialTodos())
  const [newValue, setNewTodo] = useState('')

  const toggleChecking = (id) => {
    const _todos = todos.map(todo => {
      if (todo.id === id) {
        todo.checked = !todo.checked
        return todo
      } else {
        return todo
      }
    })

    setTodos(_todos)
  }

  const deleteTodo = (id) => setTodos(todos.filter(todo => todo.id !== id))

  const addTodo = () => {
    if (newValue.length <= 3) {
      alert('Should be more 3 characters')
      return;
    }
    setTodos([...todos, {
      id: uuidv4(),
      text: newValue,
      checked: false
    }])
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center">Todo App</h1>
      </div>
      <div className="row mb-3">
        <InputGroup>
          <Input
            value={newValue}
            onInput={(event) => setNewTodo(event.target.value)}
          />
          <Button
            color="info"
            onClick={() => addTodo()}
          >
            <i className="bi-plus text-white"></i>
          </Button>
        </InputGroup>
      </div>
      <div className="row">
        <div className="col align-self-center">
          <ListGroup className="list-group">
            {todos.map(todo => (
              <ListGroupItem key={todo.id}>
                <span
                  className={`float-start cursor ${todo.checked ? 'text-decoration-line-through' : null}`}
                >
                  <Input
                    type="checkbox"
                    className="me-2"
                    checked={todo.checked}
                    onChange={() => toggleChecking(todo.id)}
                  />
                  {todo.text}
                </span>
                <span className="float-end">
                <i
                  className="bi-trash"
                  onClick={() => deleteTodo(todo.id)}
                ></i>
              </span>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default App;
