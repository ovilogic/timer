import { useEffect, useState } from 'react';
import './style/app.css'


function App() {

  const [main, setMain] = useState(0)
  const [plus, setPlus] = useState(false)
  const [minus, setMinus] = useState(false)
  const [times, setTimes] = useState(false)
  const [divide,setDivide] = useState(false)
  const [display, setDisplay] = useState('')
  const [result, setResult] = useState(0)
  const [equal, setEqual] = useState(false)
  // 'equal' instructions manual:
  //  The state is set to true when the equal button is pressed and the 
  // handleEqual() is triggerred. It is then set back to false when any
  // number button is pressed and handleNumber() is triggerred. That's it.
  const [rational, setQ] = useState(false)

  let handleEqual = () => {
    
    setMain(result)
    setDisplay(display.concat(' = ' + result))
    setPlus(false);
    setMinus(false);
    setTimes(false);
    setDivide(false);
    setEqual(true)
  }
  
  const handleNumber = (number) => {
    if (main.length > 17) {
      if (main == 'Digit limit reached') { }
      else {
        let prevMain = main
        setMain('Digit limit reached')
        setTimeout(() => setMain(prevMain), 700)
      }
    }
    else {
      if (equal) {
        setMain(String(number));
        setDisplay(String(number))
        setEqual(false)
      }
      else setDisplay(display.concat(number))
  
      if (plus == false && minus == false && times == false
        && divide == false) {
        if (main == 0) {
          setMain(main.replace('0', number))
        }
        else {
          setMain(main.concat(number))
        }
      }
      
      else {
        if (main == '+' || main == '-' || main == '*' || main == '/') {
          setMain(String(number));
          
        }
        else {
          setMain(main.concat(number));
          
        }
      }
    }
    
  }

  let numbers = []
  for (let i = 0; i < 10; i++) {
    numbers.push(i)
  }

  let padNames = ['zero', 'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine']

  let numbPad = () => 
    numbers.map(number => 
      <div className='grid-item number'
      id={padNames[number]}
      key={number}
      onClick={() => handleNumber(number)}>
        <p>{number}</p>
      </div>
      )

  useEffect(() => {
    // This is the math engine. Nothing happens on display.
    let parsedDisplay = display.split(' ')
  
    // Trimming the parse:
    while (parsedDisplay.includes('')) {
      parsedDisplay.splice(parsedDisplay.indexOf(''), 1)
    }

    // console.log(parsedDisplay)
    // if there are 2 consecutive minuses, they turn to plus, while plus and minus result in a minus:
    for (let i = 0; i < parsedDisplay.length; i++) {
      if (parsedDisplay[i] === '-' && parsedDisplay[i+1] === '-') {
        parsedDisplay[i] = '+'
        parsedDisplay.splice(i+1, 1)
      }
      else if (parsedDisplay[i] === '-' && parsedDisplay[i+1] === '+') {
        parsedDisplay[i] = '-'
        parsedDisplay.splice(i+1, 1)
      }
      else if (parsedDisplay[i] === '+' && parsedDisplay[i+1] === '-') {
        parsedDisplay[i] = '-'
        parsedDisplay.splice(i+1, 1)
      }

      else if (parsedDisplay[i] === '*' && parsedDisplay[i+1] === '-') {
        parsedDisplay[i+2] = '-'.concat(parsedDisplay[i+2])
        parsedDisplay.splice(i+1, 1)
      }

      else if (parsedDisplay[0] === '-') {
        parsedDisplay[1] = '-'.concat(parsedDisplay[1])
        parsedDisplay.splice(0, 1)
      }
     
    }

    // Define the 4 operations:
    const add = () => {
      var indexPlus = parsedDisplay.indexOf('+')
      res = Number(parsedDisplay[indexPlus - 1]) + Number(parsedDisplay[indexPlus + 1])
      parsedDisplay.splice(indexPlus - 1, 3, res)
    }

    const subtract = () => {
      var indexMinus = parsedDisplay.indexOf('-')
        res = Number(parsedDisplay[indexMinus - 1]) - Number(parsedDisplay[indexMinus + 1])
        parsedDisplay.splice(indexMinus - 1, 3, res)
    }

    const multiply = () => {
      var indexTimes = parsedDisplay.indexOf('*')
      res = Number(parsedDisplay[indexTimes - 1]) * Number(parsedDisplay[indexTimes + 1])
      parsedDisplay.splice(indexTimes - 1, 3, res)
    }

    const divide = () => {
      var indexDiv = parsedDisplay.indexOf('/')
      res = Number(parsedDisplay[indexDiv - 1]) / Number(parsedDisplay[indexDiv + 1])
      parsedDisplay.splice(indexDiv - 1, 3, res)
    }
    
    // The order of operations:
    let res
 
    const higherOperations = () => {
      if (parsedDisplay.includes('*') && parsedDisplay.indexOf('*')
        != parsedDisplay.length -1) {
         
          if (parsedDisplay.includes('/') && parsedDisplay.indexOf('/')
          != parsedDisplay.length -1 && parsedDisplay.indexOf('*')
          < parsedDisplay.indexOf('/')) {
            multiply()
          }
          else if (parsedDisplay.includes('/') && parsedDisplay.indexOf('/')
          != parsedDisplay.length -1 && parsedDisplay.indexOf('*')
          > parsedDisplay.indexOf('/')) {
            divide()
          }

          else if (parsedDisplay.includes('/') === false) {
            multiply()
          }
        }

      if (parsedDisplay.includes('/') && parsedDisplay.indexOf('/')
        != parsedDisplay.length -1) {
        
        if (parsedDisplay.includes('*') && parsedDisplay.indexOf('*')
        != parsedDisplay.length -1 && parsedDisplay.indexOf('*')
        < parsedDisplay.indexOf('/')) {
          multiply()
        }
        else if (parsedDisplay.includes('*') && parsedDisplay.indexOf('*')
        != parsedDisplay.length -1 && parsedDisplay.indexOf('*')
        > parsedDisplay.indexOf('/')) {
          divide()
        }
        else if (parsedDisplay.includes('*') === false)
          divide()
      }
    }

    if (parsedDisplay[1] != '=' && parsedDisplay.length % 2 != 0) {
      while (parsedDisplay.includes('*') || parsedDisplay.includes('/')) {
        higherOperations()
      }
    }
    
    while (['+', '-'].includes(parsedDisplay[1]) && parsedDisplay[1] != '=') {
      if (parsedDisplay[1] === '+') add()
      else subtract()
    }
    if (Number.isInteger(res)) {
      let r = String(res)
      if (r.length > 17) {
        r = Number(r).toExponential(6)
        res = r
    }
    }
    res = String(res)
    setResult(res)
    console.log('at the end result', res, parsedDisplay)
  }, [display])
  
  return (
    <div className='page'>
      <div className="App">
        {numbPad()}
        <div className="display-big">
          <div className='display1'>
            <p>{display}</p>
          </div>
          <div className='display2'>
            <p id='display'>{main}</p>
          </div>
        </div>
        <div className="grid-item AC"
          id='clear'
          onClick={() => {
            setQ(false)
            setMain('0');
            setPlus(false);
            setMinus(false);
            setDivide(false);
            setTimes(false)
            setDisplay('');
            setResult(0);
            setEqual(false);
            }
          }>
          <p>AC</p>
        </div>
        <div className="grid-item operator" id='divide'
          onClick={() => {
            setQ(false)
            setDivide(true);        
            setMain('/');
            if (equal) {
              setDisplay(String(result).concat(' / '));
              setEqual(false);
            }
            else {
              if (['+', '-', '*'].includes(display[display.length - 2 ])) {
                setDisplay(display.replace(display[display.length - 2 ], ' / '))
              }
              else {
                if (['/'].includes(display[display.length - 2 ])) { }
                else setDisplay(display.concat(' / '))
              }
            }
            }
          }>
            <p>      /         </p></div>
        <div className="grid-item operator" id='multiply'
          onClick={() => {   
            setQ(false)     
            setTimes(true);
            setMain('*');
            if (equal) {
              setDisplay(String(result).concat(' * '));
              setEqual(false);
            }
            else {
              if (['+', '-', '/'].includes(display[display.length - 2 ])) {
                setDisplay(display.replace(display[display.length - 2 ], ' * '))
              }
              else {
                if (['*'].includes(display[display.length - 2 ])) { }
                else setDisplay(display.concat(' * '))
              }
          }
          }
          }><p>      *       </p></div>
       
        <div className="grid-item operator" id='subtract'
          onClick={() => {
            setQ(false)
            setMinus(true);
            setMain('-')
            if (equal) {
              setDisplay(String(result).concat(' - '));
              setEqual(false);
            }
            else {
              for (let i = 0; i < display.length; i++) {
                console.log(i, ':', display[i])
              }
            
              if (display[display.length - 5] == '-') { }
              
              else if (display[display.length - 2] == '-' && display[display.length - 5] == '*') { }
              else setDisplay(display.concat(' - '))
            
          }
        }
        }><p>   -    </p></div>
        
        <div className="grid-item operator" id='add'
          onClick={() => {
            setPlus(true);
            setQ(false)
            setMain('+');
            if (equal) {
              setDisplay(String(result).concat(' + '));
              setEqual(false);
            }
            else {
              if (['*', '/'].includes(display[display.length - 2 ])) {
                setDisplay(display.replace(display[display.length - 2 ], ' + '))
              }
              else {
                if (['+'].includes(display[display.length - 2 ])) { }
                else if (display[display.length - 2] == '-' && display[display.length - 5] == '*') { setDisplay(display.replace(display[display.length - 2 ], ''))}
                else setDisplay(display.concat(' + '))
              }
            }
            }
          }><p>    +      </p></div>
        
        <div className="grid-item equal" id='equals'
          onClick={() => {
            if (equal) { }
            else handleEqual();
          }
          }><p>    =     </p>
        </div>

        <div className="grid-item number" id='decimal'
          onClick={() => {
            if (rational) {  }
            else {
              setQ(true)
              if (equal) {
                setDisplay(String(main).concat('.'))
                setEqual(false);
              }
              else {
                for (let i = 0; i < display.length; i++) {
                  console.log('index', i, 'value in array:', display[i], display.length)
                }
                  if (['.'].includes(display[display.length - 1 ])) { }
                  else {
                    setDisplay(display.concat('.'));
                    setMain(String(main).concat('.'))}
              }
            }
          }}><p>.</p></div>
          
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
