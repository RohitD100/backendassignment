import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Input, Heading } from "@chakra-ui/react";
import { url } from '../Url';

const user = {
  Email: "",
  Password: "",
};

function Login() {
  const [form, setForm] = useState(user);
  const [, setToken] = useState("");
  const { Email, Password } = form;
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    const val = { ...form, [name]: value };

    setForm(val);
  };

  const formHandler = (e) => {
    e.preventDefault();
    const payload = {
      Email,
      Password,
    };
    console.log(payload);
    axios({
      method: "post",
      baseURL: `${url}`,
      url: "/login",
      data: payload,
    })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        window.alert("Login Successful")
        navigate("/todo");
      })
      .catch((err) => {
        console.log(err);
      });

    setForm({ Email: "", Password: "" });

  };

  return (
    <Box>
      <Heading fontSize="16px">Login here</Heading>
      <Box width="60%" margin="auto" marginTop="50px">
        <form onSubmit={formHandler}>
          <Input
            type="text"
            placeholder="Email"
            name="Email"
            value={Email}
            onChange={inputHandler}
          />
          <br />
          <Input
            type="text"
            placeholder="Password"
            name="Password"
            value={Password}
            onChange={inputHandler}
          />
          <br />
          <Input type="Submit" />
        </form>
      </Box>
    </Box>
  );
}

export default Login;
