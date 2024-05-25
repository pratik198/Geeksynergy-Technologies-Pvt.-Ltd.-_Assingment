import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  styled,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: grey;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Login = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    password: "",
    profession: "",
  });
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();
  const [account, toggleAccount] = useState("login");

  const professions = [
    "Frontend Developer",
    "Backend Developer",
    "Teacher",
    "Doctor",
    "Engineer",
  ];

  const imageURL =
    "https://img.freepik.com/premium-vector/fast-movie-logo-cinema-logo-design-template_227744-195.jpg?size=626&ext=jpg";

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = () => {
    if (!login.username || !login.password) {
      setLoginError("Username and password are required");
    } else {
      setLoginError("");
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (user) =>
          user.username === login.username && user.password === login.password
      );
      if (foundUser) {
        navigate("/home");
      } else {
        setLoginError("Invalid username or password");
      }
    }
  };

  const signupUser = () => {
    if (
      !signup.name ||
      !signup.username ||
      !signup.password ||
      !signup.profession
    ) {
      setSignupError("All fields are required");
    } else {
      setSignupError("");
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const duplicateUser = users.find(
        (user) => user.username === signup.username
      );
      if (duplicateUser) {
        setSignupError("Username already exists");
      } else {
        users.push(signup);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signed up successfully! You can now log in.");
        toggleAccount("login");
      }
    }
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="blog" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={onValueChange}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={onValueChange}
              name="password"
              label="Enter Password"
            />
            {loginError && (
              <Text color="error" style={{ color: "red" }}>
                {loginError}
              </Text>
            )}
            <LoginButton variant="contained" onClick={loginUser}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={toggleSignup} style={{ marginBottom: 50 }}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={onInputChange}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={onInputChange}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={onInputChange}
              name="password"
              label="Enter Password"
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel>Profession</InputLabel>
              <Select
                value={signup.profession}
                onChange={(e) =>
                  setSignup({ ...signup, profession: e.target.value })
                }
              >
                {professions.map((profession, index) => (
                  <MenuItem key={index} value={profession}>
                    {profession}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {signupError && (
              <Text color="error" style={{ color: "red" }}>
                {signupError}
              </Text>
            )}
            <SignupButton onClick={signupUser}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={toggleSignup}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
