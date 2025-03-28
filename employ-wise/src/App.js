
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import UserList from './components/UserList';
import EditUser from './components/EditUser';

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
        <Route path="/users" element={<Navigate to="/" />} /> {/* Placeholder for user list */}
        <Route path="/edit/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
