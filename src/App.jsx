import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';

import axios from 'axios';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const initialErrors = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
};

const errorMessages = {
  firstName: 'Please enter a valid name longer than 3 characters',
  lastName: 'Please enter a valid last name longer than 3 characters',
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters long, contain at least one upper case, one lower case, one digit and one special character',
};

const validateEmail = (email) => {
  const regexTest = new RegExp(
    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
  );
  return email.match(regexTest);
};
const validatePassword = (password) => {
  const regexTest = new RegExp(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
  );
  return password.match(regexTest);
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
  const [userId, setUserId] = useState(null);


  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });

    if (
      (name === 'firstName' && value.length >= 3) ||
      (name === 'lastName' && value.length >= 3) ||
      (name === 'password' && value.length >= 8) && validatePassword(value) ||
      (name === 'email' && validateEmail(value))
    ) {
      setErrors({ ...errors, [name]: false });
    } else {
      setErrors({ ...errors, [name]: true });
    }
  };

 /* useEffect(() => {
    if (
      (form.firstName.length >= 3) ||
      (form.lastName.length >= 3) ||
      validateEmail(form.email) &&
      (form.password.length >= 8) && validatePassword(form.password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);
  */

  useEffect(() => {
    const isFirstNameValid = form.firstName.length >= 3;
    const isLastNameValid = form.lastName.length >= 3;
    const isEmailValid = validateEmail(form.email);
    const isPasswordValid = form.password.length >= 8 && validatePassword(form.password);
  
    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    axios
      .post('https://reqres.in/api/users', form)
      .then((res) => {
        console.log(res);
        setUserId(res.data.id);
        setForm(initialForm);
        console.log("success")
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <h1 className='text-sky-600 mb-4'>Registration</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleFirstName">First Name</Label>
          <Input
            id="exampleFirstName"
            name="firstName"
            placeholder="Enter your first name"
            type="text"
            onChange={handleChange}
            invalid={errors.firstName}
            value={form.firstName}
          />
          {errors.firstName && <FormFeedback>{errorMessages.firstName}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="exampleLastName">Last Name</Label>
          <Input
            id="exampleLastName"
            name="lastName"
            placeholder="Enter your last name"
            type="text"
            onChange={handleChange}
            invalid={errors.lastName}
            value={form.lastName}
          />
          {errors.lastName && <FormFeedback>{errorMessages.lastName}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Enter your email"
            type="email"
            onChange={handleChange}
            invalid={errors.email}
            value={form.email}
          />
          {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Enter your password "
            type="password"
            onChange={handleChange}
            invalid={errors.password}
            value={form.password}
          />
          {errors.password && (
            <FormFeedback>{errorMessages.password}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup className="text-center p-4">
          <Button disabled={!isValid} color="primary">
            Register
          </Button>
          {userId && <p>User ID: {userId}</p>}
        </FormGroup>
      </Form></div>
  );
}
