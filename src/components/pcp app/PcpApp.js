import logo from './logo.svg';
import './PcpApp.css';

function PcpApp() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
           <code>In progress</code> 
        </p>
        <a
          className="App-link"
          href="https://www.instagram.com/manu.lopezanido/?hl=es-la"
          target="_blank" rel="noreferrer"
        >
          Created by Manu
        </a>
      </header>
    </div>
  );
}

export default PcpApp;
