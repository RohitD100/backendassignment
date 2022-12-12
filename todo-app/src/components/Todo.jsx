import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Box, Input, Heading, Button, Select } from '@chakra-ui/react'
import { url } from '../Url';

const notes = {
  title: "",
  content: "",
  author: "",
  category: "",
};

function Todo() {
  const [note, setNote] = useState(notes);
 
  const { title, content, author, category } = note;

const inputHandler=(e)=>{
  const { name, value} = e.target;
  const val = {...note, [name]:value};

  setNote(val);
}

const formHandler =(e)=>{
  e.preventDefault();
  const payload = {
    title,content,author, category
  }
  
  console.log(payload);
  axios({
    method:"post",
    baseURL:`${url}`,
    url:"/notes/create",
    headers: {"Authorization":`Bearer ${localStorage.getItem("token")}`,
  'Content-Type':"application/json"
  },
    data:payload

}).then((response) => {
    console.log(response);
}).catch((err)=>{
    console.log(err)
})

}

  return (
    <Box>
      <Heading>WelCome</Heading>
      <Box width="60%" margin="auto">
        <form>
          <Input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={inputHandler}
          />
          <br />
          <Input
            type="text"
            placeholder="content"
            name="content"
            value={content}
            onChange={inputHandler}
          />
          <br />
          <Input
            type="text"
            placeholder="author"
            name="author"
            value={author}
            onChange={inputHandler}
          />
          <br />
          <Select
            type="text"
            placeholder="category"
            name="category"
            onChange={inputHandler}
          >
          <option value="">select categories</option>
          <option value="React">React</option>
          <option value="Redux">Redux</option>
          <option value="Mongodb">Mongodb</option>
          </Select>
          <br />
          <Button onClick= {formHandler}>Add Notes</Button>
        </form>
        <Link to="/todoitem">
            <Box color="blue">
              Go to notes
            </Box>
        </Link>
      </Box>
    </Box>
  );
}

export default Todo;
