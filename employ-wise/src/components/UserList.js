import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Table, Button, Pagination, Image } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${page}`)
      .then(res => {
        setUsers(res.data.data);
        setTotalPages(res.data.total_pages);
      })
      .catch(err => console.error(err));
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id)); // Remove deleted user from the list
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };
  

  return (
    <Container className="mt-5">
      <h2 className="text-center">User List</h2>
      <Button variant="danger" onClick={handleLogout} className="mb-3">Logout</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Image src={user.avatar} roundedCircle width="50" /></td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => navigate(`/edit/${user.id}`)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
      </Pagination>
    </Container>
  );
};

export default UserList;
