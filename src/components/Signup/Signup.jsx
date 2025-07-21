import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from 'utils/auth';

const Signup = ({ show, onHide }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post('https://jwt-assignment1.onrender.com/api/signup', form);
      alert('Signup successful');
      setToken(res.data.token);
      setForm({name: '', email: '', password: ''})
      onHide();
      navigate('/cart');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control value={form.name} type="text" onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={form.email} type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSignup}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Signup;
