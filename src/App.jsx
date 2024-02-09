import { useRef, useState, useEffect } from 'react'
import detale from './assets/delete.png'
import updateIcon from './assets/update.png'

import './App.css'

function App() {
  const inputRef = useRef('');
  const [dataLocal, setDataLocal] = useState([]);
  const [update, setUpdate] = useState(false)
  const [updateId, setUpdateId] = useState(0);

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

  function handleDelete(id, name) {
    let isDelete = confirm(`Rosdan ham ${name} ni ochirmoqchimisiz `)
    if (isDelete) {
      let copied = JSON.parse(JSON.stringify(dataLocal))
      copied = copied.filter(el => {
        return el.id != id
      })
      setDataLocal(copied)
      localStorage.setItem('todos', JSON.stringify(copied))
    }
  }
  function handleUpdateMain() {
    if (inputRef.current.value.trim().length < 3) {
      alert("3 tadan kam belgin kiritish mumkin emas")
      inputRef.current.focus();
      return
    }
    setUpdate(!update)
    let copied = JSON.parse(JSON.stringify(dataLocal))
    copied = copied.map(el => {
      if (el.id == updateId) {
        el.name = inputRef.current.value
      }
      return el
    })
    setDataLocal(copied)
    localStorage.setItem('todos', JSON.stringify(copied))
    inputRef.current.value = ""
  }





  function allClear() {
    if (dataLocal.length > 0) {
      let a = confirm("Barchasini o'chirib tashlamoqchimisiz ?")
      if (a) {
        setDataLocal([])
        localStorage.setItem('todos', [])
      }
    }
  }


  return (
    <>
      <h1>Todo APP</h1>
      <div className="todo-wrapper">
        <form >
          <input maxLength={45} ref={inputRef} type="text" placeholder='Enter name...' />
          {
            update ? <button onClick={(e) => {
              e.preventDefault();
              handleUpdateMain();
            }}>Update</button> : <button onClick={handleSubmit}>OK</button>
          }
        </form>
        <br />
        <ul>
          {
            dataLocal.map((todo, index) => {
              return (
                <li key={index}>
                  <div className='text'>
                    <input checked={todo.status == "checked" ? true : false} onChange={(e) => { handleChacked(e, todo) }} type="checkbox" />
                    <span>{todo.name}</span>
                  </div>
                  <span className='deeds'>
                    <span onClick={() => {
                      setUpdate(true)
                      setUpdateId(todo.id)
                      inputRef.current.value = todo.name
                    }} ><img src={updateIcon} width={35} alt="" /></span>
                    <span onClick={() => { handleDelete(todo.id, todo.name) }}> <img src={detale} width={35} alt="" /> </span>
                  </span>
                </li>
              )
            })
          }
          <button className='clear' onClick={allClear}>All Clear</button>
        </ul>
      </div>
    </>
  )
}

export default App
