

import { useEffect, useState } from 'react';
import './style/app.css'


function App() {

  const [total, setTotal] = useState(0)
  const [main, setMain] = useState('0')
  const [plus, setPlus] = useState(false)
  const [minus, setMinus] = useState(false)
  const [times, setTimes] = useState(false)
  const [divide,setDivide] = useState(false)
  const [display, setDisplay] = useState('')
  const [subTotal, setSubTotal] = useState(0)
  const [result, setResult] = useState(0)
 

  let numbers = []
  for (let i = 0; i < 10; i++) {
    numbers.push(i)
  }

  console.log(display.length)


  
  let handleEqual = () => {
    setMain(result)
    
    setPlus(false);
    setMinus(false);
    setTimes(false);
    setDivide(false)
    
  }
  console.log(display[display.length - 3])
  const handleNumber = (number) => {
    
    setDisplay(display.concat(number))
    if (plus == false && minus == false && times == false
      && divide == false) {
      setTotal(Number(main.concat(number)))
      if (main == '0') {
        setMain(main.replace('0', number))
      }
      else {
        setMain(main.concat(number))
      }
    }
    
    else {
      if (main == '+' || main == '-' || main == 'x' || main == '/') {
        setMain(String(number));
        setSubTotal(Number(String(number)))
      }
      else {
        setMain(main.concat(number));
        setSubTotal(Number(main.concat(number)))
      }
    }
  }


  console.log(typeof subTotal, typeof total)
  console.log('subTotal =', subTotal, 'total =', total)
  let numbPad = () => 
    numbers.map(number => 
      <div className='grid-item number'
      id={'no'.concat(number)}
      onClick={() => handleNumber(number)}>
        <p>{number}</p>
      </div>
      )

  useEffect(() => {
    let parsedDisplay = display.split(' ')
    if (parsedDisplay[parsedDisplay.length -1] == '') {
      parsedDisplay.pop()
    }
    // let operations = parsedDisplay.filter(item => ['+', '-', '/',
    // 'x'].includes(item))
    console.log(parsedDisplay)
    let res
    
      if (parsedDisplay.includes('x') && parsedDisplay.indexOf('x') 
      != parsedDisplay.length - 1) {
        var indexTimes = parsedDisplay.indexOf('x')
        res = Number(parsedDisplay[indexTimes - 1]) * Number(parsedDisplay[indexTimes + 1])
        parsedDisplay.splice(indexTimes - 1, 3, res)
        
      }
      if (parsedDisplay.includes('/') && parsedDisplay.indexOf('/')
      != parsedDisplay.length -1) {
        var indexDiv = parsedDisplay.indexOf('/')
        res = Number(parsedDisplay[indexDiv - 1]) / Number(parsedDisplay[indexDiv + 1])
        parsedDisplay.splice(indexDiv - 1, 3, res)
      }
      if (parsedDisplay.includes('+') && parsedDisplay.indexOf('+')
      != parsedDisplay.length -1) {
        var indexPlus = parsedDisplay.indexOf('+')
        res = Number(parsedDisplay[indexPlus - 1]) + Number(parsedDisplay[indexPlus + 1])
        parsedDisplay.splice(indexPlus - 1, 3, res)
      }
      if (parsedDisplay.includes('-') && parsedDisplay.indexOf('-')
      != parsedDisplay.length -1) {
        var indexMinus = parsedDisplay.indexOf('-')
        res = Number(parsedDisplay[indexMinus - 1]) + Number(parsedDisplay[indexMinus + 1])
        parsedDisplay.splice(indexMinus - 1, 3, res)
      }
      setResult(res)
      
      
    // }
  
  console.log('parsed results', parsedDisplay, indexTimes, indexDiv, res)
  }, [display])
    
  
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
            setSubTotal(0)
            setTotal(0);
            setMain('0');
            setPlus(false);
            setMinus(false);
            setDivide(false);
            setTimes(false)
            setDisplay('');
            }
          }>
          <p>AC</p>
        </div>
        <div className="grid-item operator"
          onClick={() => {
            
            setDivide(true);
            setDisplay(display.concat(' / '));
            setMain('/');
          }
          }>
            <p>/</p></div>
        <div className="grid-item operator"
          onClick={() => {
         
            setTimes(true);
            setDisplay(display.concat(' x '));
            setMain('x');
          }
          }><p>X</p></div>
       
        <div className="grid-item operator"
          onClick={() => {
            setMain('-')
            
            setMinus(true);
            setDisplay(display.concat(' - '));
            setMain('-')
            ;
          }
          }><p> -</p></div>
        
        <div className="grid-item operator"
          onClick={() => {
           
            setPlus(true);
            
            setDisplay(display.concat(' + '))
            setMain('+');
            }
          }><p>+</p></div>
        
        <div className="grid-item equal"
          onClick={() => handleEqual()
          }><p>=</p></div>
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
