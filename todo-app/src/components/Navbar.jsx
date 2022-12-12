import React from 'react'
import { Link } from 'react-router-dom'
import {Box, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();

const signout =()=>{
  localStorage.setItem("token", "")
  navigate("/");
}
  return (
    
    <Box style={{display:"flex", justifyContent:"space-between", width:"80%", margin:"auto"}}>
        <Link to={"/"}>
            <Heading fontSize="20px">WelCome</Heading>
        </Link>
        
        
          {
            `${localStorage.getItem("token")}` ? 
            (<Heading fontSize="20px" cursor={"pointer"} onClick={signout}>Sign Out</Heading>) :  (<Link to={"/signup"}><Heading fontSize="20px">SignUp</Heading></Link>)
          }
       
      
    
    </Box>
  )
}

export default Navbar
