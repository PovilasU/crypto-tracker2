import React, { useState, Component, useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>ReactJS, Redux, MaterialUI, Coinranking API</p>
        <span>
          <span>Github </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repositorty
          </a>
        </span>
        <Counter />
      </header>
    </div>
  );
}

export default App;
