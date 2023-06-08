import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import ChatProvider from './Context/chatProvider';

function App() {
  return (
    <>
      <Router>
        <ChatProvider>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </ChatProvider>
      </Router>
    </>
  );
}

export default App;
