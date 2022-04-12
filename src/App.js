import { useState } from 'react';
import './style/app.css'

function App() {
  
  const [current, setCurrent] = useState('session')
  const [session, setSession] = useState(25)
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  
  

  const newTime = new Date()
  
  // newTime.setMinutes(newTime.getMinutes() + session)
  // let n = newTime.getTime()
 

  // const now = new Date().getTime()

  // let difference = n - now
  

  // console.log(difference)


  // // setInterval(() => {
 

  // //   var minutes = Math.floor(difference / (1000 * 60))
   
  // //   setMin(minutes)
    
  //   }, 60000)

  // setInterval(() => {
 
   
  //   var seconds = Math.floor((difference % (1000 * 60)) / 1000)

  //   setSec(seconds)
  // }, 1000)





  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="panel">
        <div className='break'>
          <h2>break length</h2>
          <div className='functions'></div>
        </div>
        <div className='session'>
          <h2>session length</h2>
          <div className='functions'></div>
        </div>
      </div>
      <div className="display">
        <h2>{current}</h2>
        <div className='timer'>
          {min}:{sec}
        </div>
      </div>
      <div className="controls">

      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default App;
