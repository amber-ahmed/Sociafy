import './App.css';
import { Route, Routes } from "react-router-dom";
import IsLogged from './views/auth/isLogged';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import LandingPage from './views/LandingPage';
import Home from './views/Home';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<IsLogged />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
