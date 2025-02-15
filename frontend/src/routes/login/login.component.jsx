import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

import FormContainer from "../../components/form-container/form-container.component";
import Loader from "../../components/loader/loader.component";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submitHandler");
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mt-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>

          <Button
            className="mt-3"
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Form.Group>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
