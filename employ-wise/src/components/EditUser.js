import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EditUser.css"; 
import { Container, Form, Button, Alert } from "react-bootstrap";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(res => setUser(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      setMessage("User updated successfully!");
      setTimeout(() => navigate("/users"), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="Edit-container mt-5">
      <h2 className="text-center">Edit User</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleUpdate} className=" Edit-box w-50 mx-auto">
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 w-100">Update</Button>
      </Form>
    </Container>
  );
};

export default EditUser;
