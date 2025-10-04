import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // let counter = 15;

  let [counter, setcounter] = useState(0);
  let [message, setmessage] = useState("");

  const addvalue = () => {
    //counter = counter + 1;
    if(counter == 10){
      setmessage("Maximum limit reached");
    }

    if(counter < 10){
      setcounter(counter + 1);
      setmessage("");
    }

  }

  const removevalue = () => {
    //counter = counter - 1;
    if(counter > 0){
      setcounter(counter - 1);
    }
  }



  return (
    <>
      <h1>Simple Counter</h1>
      <h3>counter value : {counter}</h3>

      <button onClick={addvalue}>Add value {counter}</button>
      <br />
      <br />
      <button onClick={removevalue}>Remove value {counter}</button>
      <h3> {message} </h3>
    </>
  )
}

export default App
