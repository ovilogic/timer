import './style/app.css'


function App() {
  return (
    <div className='page'>

      <div className="App">
        <div class="display">0</div>
        <div class="grid-item AC">
          <p>AC</p>
        </div>
        <div class="grid-item operator"><p>/</p></div>
        <div class="grid-item operator"><p> X</p></div>
        <div class="grid-item number"><p>7 </p></div>
        <div class="grid-item number"><p> 8</p></div>
        <div class="grid-item number"><p> 9</p></div>
        <div class="grid-item operator"><p> -</p></div>
        <div class="grid-item number"><p>4 </p></div>
        <div class="grid-item number"><p> 5</p></div>
        <div class="grid-item number"><p> 6</p></div>
        <div class="grid-item operator"><p>+</p></div>
        <div class="grid-item number"><p>1</p></div>
        <div class="grid-item number"><p>2</p></div>
        <div class="grid-item number"><p>3</p></div>
        <div class="grid-item equal"><p>=</p></div>
        <div class="grid-item zero"><p>0</p></div>
        <div class="grid-item number"><p>.</p></div>
          
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
