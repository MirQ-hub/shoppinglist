import axios from 'axios';
import './App.css';
import{useEffect, useState}from 'react';

const URL ="http://localhost/shoppinglist/";

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');

  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item})
    axios.post(URL +'add.php',json,{
      headers:{
        'Content-Type' : 'application/json'
      }
    })
    .then((response) =>{
      setItems(items =>[...items,response.data]);
      setItem('');
    }).catch(error => {
      alert(error.response.data.error);
    })
  }
  


  useEffect(()=> {
    axios.get(URL)
    .then((response) => {
      setItems(response.data)
    }).catch(error =>{
      alert(error.response ? error.response.data.error : error);
    })
  } ,[]);

  return (
    <div className='container'>
      <h3>Shoppinglist</h3>
      <form onSubmit={save}>
        <label>New item</label>
        <input value={item} onChange={e =>setItem(e.target.value)}/>
        <button>Save</button>
      </form>
      <ol>
        {items.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
