import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import {Box, Input, Heading} from "@chakra-ui/react";
import { url } from '../Url';

const user = {
    Name:"",
    Email:"",
    Password:""
}

function Signup() {
    const [form, setForm]  = useState(user);
    const navigate = useNavigate();
    const {Name,Email, Password} = form;
    
const inputHandler =(e)=>{
    const {name, value} = e.target;

    const val = {...form, [name]: value};

    setForm(val);
};



const formHandler =(e)=>{
    e.preventDefault();
    const payload = {
        Email, Password,Name
    }
    console.log(payload);

    axios({
        method:"post",
        baseURL:`${url}`,
        url:"/signup",
        data: payload
    }).then((res)=>{
        console.log(res);
        window.alert("sign up Successful")
        navigate("/login");

    }).catch((err)=>{
        console.log(err);
    })

    setForm({Email:"", Password:"", Name:""});

}

  return (
    <Box>
    <Heading fontSize="15px">Sign Up here</Heading>
    <Box width="60%" margin="auto" marginTop="50px">
        <form onSubmit={formHandler}>

            <Input type="text" placeholder='Email' name="Email" value={Email} onChange={inputHandler} /><br/>
            <Input type="text" placeholder='Password' name="Password" value={Password} onChange={inputHandler}/><br/>
            <Input type="text" placeholder='Name' name="Name" value={Name} onChange={inputHandler}/><br/>
            <Input type="Submit"/>
        </form>
        <Box>
            <Link to="/login">
                Already Registered
            </Link>
        </Box>
    </Box>

    </Box>
  )
}

export default Signup;
