import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",  // This should match the backend field
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.username,  // Ensure this matches the backend field
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={500} display="flex" flexDirection={'column'} alignItems={'center'} margin={'auto'} marginTop={10} boxShadow='10px 10px 20px #ccc' padding={3} borderRadius={5}>
          <Typography variant='h5' padding={4} textAlign={'center'}>Register</Typography>
          <TextField fullWidth value={inputs.username} onChange={handleChange} placeholder='Username' name='username' margin='normal' type={'text'} required />
          <TextField fullWidth value={inputs.email} onChange={handleChange} placeholder='Email' name='email' margin='normal' type={'email'} required />
          <TextField fullWidth value={inputs.password} onChange={handleChange} placeholder='Password' name='password' margin='normal' type={'password'} required />
          <Button type='submit' variant='contained' color='primary' sx={{ marginTop: 3 }}>Register</Button>
          <Button onClick={() => navigate('/login')} sx={{ marginTop: 3 }}>Already have an account?!</Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
