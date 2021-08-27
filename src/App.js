import React from 'react';


function dataReducer(state, action) {
  switch (action.type) {
    case 'ADD_DATA':
      return ([action.data, ...state])
    case 'DELETE_DATA':
      return state.filter(item => item.id !== action.id)
    case 'DELETE_ALL':
      return ([]);
    default:
      return state
  }
}


function App() {
  const [allData, dispatch] = React.useReducer(dataReducer, [], () => {
    const localData = localStorage.getItem('Datas');
    return localData ? JSON.parse(localData) : []
  })
  
  React.useEffect(() => {
    localStorage.setItem('Datas', JSON.stringify(allData))
    //console.log(allData)
  }, [allData])
  
  
  const [selectedName, setSelectedName] = React.useState({});
  const [startOrEnd, setStartOrEnd] = React.useState({});
  const [checked, setChecked] = React.useState(null);
  
  const addItem = (event) => {
    event.preventDefault();
    var radio1 = document.querySelector('input[type=radio][name=name]:checked');
    var radio2 = document.querySelector('input[type=radio][name=startOrEnd]:checked');
    radio1.checked = false;
    radio2.checked = false;
    
    var today = new Date();
    var todayTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true});
    var date = today.getMonth() + '/' + today.getDate() 
    //var time = todayTime.getHours() + ':' + todayTime.getMinutes();
    var dateAndTime = date + '-' + todayTime 
    
    let data = {name: selectedName, startOrEnd: startOrEnd, time: dateAndTime, id: Math.random()}
    //console.log(data)
    dispatch({type: 'ADD_DATA', data:data})
  }
  
  const names = [
    {value: 'khuku', label: 'খুকু', id:1},
    {value: 'bashi', label: 'বাঁশি', id:3},
    {value: 'mejba', label: 'মেজবা', id:2},
  ]
  
  const reckonTimes = [
    {value: 'starts', label: 'Starts', id:1},
    {value: 'ends', label: 'Ends', id:2}
  ]
  
  return (
    <div className="App container">
     
      <div className="d-flex justify-content-center">
      <form onSubmit={(event) => addItem(event)}>
        
        <h5>Name:</h5>
        {names.map(name => (
        <div className="form-check form-check-inline" id={name.id}>
          <label className="form-check-label" htmlFor="mejba">
            <input className="form-check-input" type="radio" name="name" value={name.value} onChange={(e) => setSelectedName(name)} required checked={checked}/>
            {name.label}
          </label>
        </div>
        ))}
        
        <br/>
        <h5>Time:</h5>
        {reckonTimes.map(reckonTime => (
        <div className="form-check form-check-inline" id={reckonTime.id}>
          <label className="form-check-label" htmlFor="start">
            <input className="form-check-input" type="radio" name="startOrEnd" value={reckonTime.value} onChange={(e) => setStartOrEnd(reckonTime)} required checked={checked}/>
            {reckonTime.label}
          </label>
        </div>
        ))}
        <br/>
        <br/>
        <div className="d-grid gap-2 col-6 mx-auto">
          <input type="submit" value="Add" />
        </div>
      </form>
      </div>
      
      <br/>
      <br/>
      {allData && <table className="table table-dark table-hover caption-top">
        <caption className="text-center text-white">All Data</caption>
        <tbody>
          {allData.map(data => (
          <tr>
            <td>{data.name.label}</td>
            <td>{data.time}</td>
            <td>{data.startOrEnd.label}</td>
            <td><button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => dispatch({type: 'DELETE_DATA', id:data.id})}></button></td>
          </tr>
          ))}
        </tbody>
      </table> }
      
    </div>
  );
}

export default App;
