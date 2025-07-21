import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { setToken } from 'utils/auth';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

const Login = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://jwt-assignment1.onrender.com/api/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      setEmail('');
      setPassword('');
      onHide();
      navigate('/cart');
    } catch (error) {
      alert('Login Failed');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="form-email">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="form-password">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
