import React, { useState, useEffect }from 'react';
import './App.css';
import Start from './Start.js';
import Questions from './Questions.js';
import Result from './Result.js'

export function SwitchScreen({screen, setScreen}) {
  const [missCount, setMissCount] = useState(0);
  const [beginTime, setBeginTime] = useState('');
 
  switch(screen){
    default:
    case 'start':
      return (
        <Start setScreen={setScreen}/> 
      );
    break;
    case 'questions':
      return (
        <Questions 
        setScreen={setScreen}
        setMissCount={setMissCount}
        missCount={missCount} 
        beginTime={beginTime} 
        setBeginTime={setBeginTime}/> 
      );
    break;
    case 'result':
      return (
        <Result 
        setScreen={setScreen} 
        missCount={missCount} 
        beginTime={beginTime}/> 
      );
      break;
  }
}

function App(){
  const [screen, setScreen] = useState('start');

  return (
    <div className="App">
      <header style={{backgroundColor:"#2177B9", height:"90px"}}>
        <h1 style={{color:"white",fontSize:"80px", margin:"0", textShadow:"2px 2px 0 black"}}>NS-TYPING</h1>
      </header>
      <div style={{
        width:"700px", 
        height:"500px", 
        margin:"80px auto", 
        backgroundColor:"#1E1E1E", 
        border:"10px solid #1E815E", 
        boxShadow:"5px 5px 5px rgba(0, 0, 0, 0.85)"
        }}>
          <SwitchScreen screen={screen} setScreen={setScreen}/>
      </div>
    </div>
  );
}

export default App;



