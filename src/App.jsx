import { useRef, useState, useEffect } from 'react'
import './App.css'

function App() {
  const inputRef = useRef('');
  const [dataLocal, setDataLocal] = useState([]);

  useEffect(() => {
    let data = [];
    if (localStorage.getItem('todos')) {
      data = JSON.parse(localStorage.getItem('todos'))
    }

    setDataLocal(data);

  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value.trim().length < 3) {
      alert("3 tadan kam belgin kiritish mumkin emas")
      inputRef.current.focus();
      return;
    }

    const todo = {
      id: Date.now(),
      name: inputRef.current.value,
      status: "unchecked"
    };

    let copy = JSON.parse(JSON.stringify(dataLocal));
    copy.push(todo);
    setDataLocal(copy);
    localStorage.setItem('todos', JSON.stringify(copy));
    inputRef.current.value = '';

  }

  function handleChacked(e, todo) {
    let copied = JSON.parse(JSON.stringify(dataLocal))
    copied = copied.map(el => {
      if (el.id == todo.id) {
        if (e.target.checked) {
          el.status = "checked"
        } else {
          el.status = "unchecked"
        }
      }
      return el;
    })

    setDataLocal(copied);
    localStorage.setItem('todos', JSON.stringify(copied))

  }

  return (
    <>
      <h1>Todo APP</h1>
      <div className="todo-wrapper">
        <form onSubmit={handleSubmit}>
          <input ref={inputRef} type="text" placeholder='Enter name...' />
          <button>OK</button>
        </form>
        <br />
        <ul>
          {
            dataLocal.map((todo, index) => {
              return (
                <li key={index}>
                  <div className='text'>
                    <input checked={todo.status == "checked" ? true : false} onChange={() => { handleChacked(todo) }} type="checkbox" />
                    <span>{todo.name}</span>
                  </div>
                  <span className='deeds'>
                    <span>update</span>
                    <span>delete</span>
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}

export default App
