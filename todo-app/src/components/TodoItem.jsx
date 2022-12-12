import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from '../Url';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input, Select,Heading, Box  } from "@chakra-ui/react";
import {
  Modal,
  // ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";


const notes = {
  title: "",
  content: "",
  author: "",
  category: "",
};


function TodoItem() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [note, setNote] = useState(notes);
 const [noteid, setNoteid] = useState("")
 

  const { title, content, author, category } = note;

const inputHandler=(e)=>{
  const { name, value} = e.target;
  const val = {...note, [name]:value};

  setNote(val);
}
  const getdata = () => {
    axios({
      method: "get",
      baseURL: `${url}`,
      url: "/notes",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setData(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteNotes = (id) => {
    axios({
      method: "delete",
      baseURL: `${url}`,
      url: `/notes/delete/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

const OnopenNotesHandler =(id)=>{
  setNoteid(id)
  onOpen();
  // console.log(id)
}


const UpdateNotesHandler =()=>{
  // console.log(noteid)
  const payload = {
    title, content, author, category
  }
  axios({
    method: "put",
    baseURL: `${url}`,
    url: `/notes/update/${noteid}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    data:payload,
  })
    .then((response) => {
      
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  onClose()
  window.location.reload();
}

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Box style={{ width: "60%", margin: "auto" }}>
        <Box>
          <Heading>Notes details</Heading>
          <Link to="/todo">
            <h3>Add More Note</h3>
          </Link>
        </Box>
        <Table
          style={{
            margin: "20px",
            borderSpacing: "10px",
          }}
        >
          <Thead style={{ backgroundColor: "yellow" }}>
            <Tr>
              <Th style={{ padding: "10px" }}>Title</Th>
              <Th style={{ padding: "10px" }}>Content</Th>
              <Th style={{ padding: "10px" }}>Author</Th>
              <Th style={{ padding: "10px" }}>Remove Note</Th>
              <Th style={{ padding: "10px" }}>Update Notes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <Tr key={item._id}>
                <Td cursor="pointer">{item.title}</Td>
                <Td cursor="pointer">{item.content}</Td>
                <Td cursor="pointer">{item.author}</Td>
                <Td
                  style={{ backgroundColor: "red", cursor: "pointer" }}
                  onClick={() => deleteNotes(item._id)}
                >
                  Remove
                </Td>
                <Td
                  style={{ backgroundColor: "green", cursor: "pointer" }}
                  onClick={()=>OnopenNotesHandler(item._id)}
                >
                  Edit
                </Td>
                <Modal isOpen={isOpen} onClose={onClose}>
                  {/* <ModalOverlay /> */}
                  <ModalContent>
                    <ModalHeader>Edit Your Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
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
                      </form>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={UpdateNotesHandler}>
                        Update
                      </Button>
                      <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default TodoItem;
