import { useEffect, useState } from 'react';
import Alert from './Alert';
import './App.css';
import List from './List';

const getLocalStorage = () => {
  let list = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
  return list;
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'Please enter value', 'danger')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
      showAlert(true, 'Item added to the list', 'success')
    }

  }

  const clearList = () => {
    setList([]);
    showAlert(true, 'empty list', 'danger')

  }

  const showAlert = (show=false,  msg="", type="") => {
    setAlert({show,type,msg})

  }

  const removeItem = (id) => {
    const newItems = list.filter(item => item.id !== id);
    setList(newItems);
    showAlert(true, 'item removed', 'danger')
  }

  const editItem = (id) => {
    const specificItem = list.filter(item => item.id === id)[0];
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  },[list])
  

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='e.g. eggs' value={name} onChange={e => {
            setName(e.target.value)
          }} />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (  <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button className="clear-btn" type='submit' onClick={clearList}>
          clear items
        </button>
      </div>)}
    
    </section>
  );
}

export default App;
