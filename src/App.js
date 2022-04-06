
import { useState } from 'react';
import './style/app.css'


function App() {

  const [total, setTotal] = useState('')
  const [main, setMain] = useState('')
  const [plus, setPlus] = useState(false)
  const [minus, setMinus] = useState(false)
  const [display, setDisplay] = useState('')

  let numbers = []
  for (let i = 0; i < 10; i++) {
    numbers.push(i)
  }

  console.log(typeof main, typeof total)



  const handleNumber = (number) => {

    if (typeof total == 'string') {
      setTotal(total.concat(number))
    }
    if (typeof main == 'string') {
      setMain(number)
    }
    else {setMain(String(main).concat(number))}
    
    
    setDisplay(display.concat(number))
    if (plus) {
      console.log(typeof total, ' is type of total')
      setTotal(total + number)
      
      setPlus(false)
      
      
    }
    else if (minus) {
      setTotal(total - number)
      setMinus(false)
    }
  }
  
  let numbPad = () => 
    numbers.map(number => 
      <div className='grid-item number'
      id={'no'.concat(number)}
      onClick={() => handleNumber(number)}>
        
        <p>{number}</p>
      </div>
      )
  

  console.log('main =', main, 'total =', total)
 
  


  return (
    <div className='page'>

      <div className="App">
        {numbPad()}
        <div className="display" id='display'>
          <div className='display1'>
            <p>{display}</p>
          </div>
          <div className='display2'>
            <p>{main}</p>
          </div>
        </div>
        <div className="grid-item AC"
          id='clear'
          onClick={() => {
            setTotal('');
            setMain('');
            setPlus(false);
            setMinus(false)
            setDisplay('')}}>
          <p>AC</p>
        </div>
        <div className="grid-item operator"><p>/</p></div>
        <div className="grid-item operator"><p> X</p></div>
       
        <div className="grid-item operator"
        onClick={() => {
          setMinus(true);
          setDisplay(display.concat('-'));
          setMain('-');
          }
          }><p> -</p></div>
        
        <div className="grid-item operator"
          onClick={() => {
            setTotal(Number(total))
            setPlus(true);
            setDisplay(display.concat('+'))
            setMain('+');
            }
          }><p>+</p></div>
       
        
        <div className="grid-item equal"
          onClick={() => setMain(total)}><p>=</p></div>
        
        <div className="grid-item number"><p>.</p></div>
          
      </div>
      
      <div className='logo'>
        <h5>made by 
        <a href='https://github.com/ovilogic'> ovilogic</a>
        </h5>

      </div>

    </div>
  );
}

export default App;
