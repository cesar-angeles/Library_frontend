import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/GetAllBooks';
import About from './components/About';
import SetBook from './components/SetBook';
import GetBook from './components/GetBook';
import './css/Navbar.css'

function App() {
  return(
    <Router>
        <div >
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                
                    <li><Link to='/setBook'>Create New Book Record</Link></li>
                    
                    <li><Link to='/getBook'>Search Book</Link></li>

                    <li><Link to='/about'>About</Link></li>
                </ul>
            </nav>
            
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/getBook' element={<GetBook/>} />
                <Route path='/setBook' element={<SetBook/>} />

            </Routes>
        </div>
    </Router>
  )
}

export default App;
