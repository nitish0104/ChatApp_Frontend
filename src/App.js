import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoginForm from './Components/test/Loginfoem';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/testForm" element={<LoginForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
