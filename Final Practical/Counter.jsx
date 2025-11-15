import React, { useState } from "react";

// let counter = 15;

function Counter() {
  let [counter, setcounter] = useState(0);

  let [message, setmessage] = useState("");

  // let bg = document.querySelector('body');
  // let btn = document.getElementById('addbtn');

  const addvalue = () => {
    if (counter == 10) {
      setmessage("Maximum limit reached");
      // btn.style.backgroundColor = 'red';
      // bg.style.backgroundColor = 'red';
    }

    if (counter < 10) {
      setcounter(counter + 1);
      // btn.style.backgroundColor = 'green';
      setmessage("");
    }
  };

  const removevalue = () => {
    if (counter > 0) {
      setcounter(counter - 1);
      // btn.style.backgroundColor = 'green';
      setmessage("");
    }
  };

  const resetvalues = () => {
    setcounter((counter = 0));
  };

  return (
    <>
      <h1>Simple Counter</h1>
      <h3>counter value : {counter}</h3>

      <button id="addbtn" onClick={addvalue}>
        Add value
      </button>
      <br />
      <br />
      <button onClick={removevalue}>Remove value</button>
      <br />
      <br />
      <button onClick={resetvalues}>Reset</button>
      <h3> {message} </h3>
    </>
  );
}

export default Counter;
