import React from 'react';
import Game from "./components/Game"
import Header from "./components/Header"
import Rules from "./components/Rules"
import About from "./components/About"
import "./App.css";


function App() {
  
  return (
    <div className="App">
    <div className="container">
      <Header/>
      <div className="middle">
      <Game/>
      <Rules/>
      </div>
      <About/>
    </div>
    </div>
  );
}

export default App;
