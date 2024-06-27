import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import View from './components/View'
import Home2 from './components/Home2'
import View2 from './components/View2'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (
    <>
    <Router>
      <Navbar/> 
      <Routes>
        <Route path='/' element={<Home2/>}/>
        <Route path='/view' element={<View2/>}/>
        </Routes>     
    </Router>
    </>
  )
}

export default App