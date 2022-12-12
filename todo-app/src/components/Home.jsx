import React from 'react'
import {Box, Heading} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box>
        <Heading>Dashboard</Heading>
        <Box display="flex" justifyContent="space-evenly">
            <Link to={"/login"}>
                <Heading fontSize={"16px"} color="blue">Go To Login</Heading>
            </Link>
        </Box>
    </Box>
  )
}

export default Home
