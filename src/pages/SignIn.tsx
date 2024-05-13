import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Container,
  } from "@mui/material";
  import { LockOutlined } from "@mui/icons-material";
  import { Alert } from 'react-bootstrap';
  import CSS from "csstype";

const SignIn = () => {

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [incorrectError, setIncorrectError] = useState(false);

    const inputDiv: CSS.Properties = {
        width: '400px',
      };

    const navigate = useNavigate()

    function handleLogin() {

        interface UserData {
            userEmail: string;
            userPw: string;
        }
        
        let userData = localStorage.getItem('userList');
        let userDataList: UserData[] = userData ? JSON.parse(userData) : [];

        const isUserRegistered = userDataList.find((data) => data.userEmail === emailInput && data.userPw === passwordInput);

        if (!emailInput || !passwordInput) {
            setIncorrectError(true);
        } else if (!isUserRegistered) {
            setIncorrectError(true);
        } else {
            navigate('/home');
        }
    }

    function handleClick() {
        navigate('/signup');
    }

    return (
        <>
        <Container maxWidth="xs">
        <form onSubmit={handleLogin}>
        <Box
            sx={{
                mt: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: "pink" }}>
                <LockOutlined />
            </Avatar>
            <h4 className="center">Sign In</h4>
                <div className="mb-3" style={inputDiv}>
                    <label>Email</label>
                    <input className="form-control" type="email" placeholder="Enter email" onChange={(event) => setEmailInput(event.target.value)} />
                </div>
                
                <div className="mb-3" style={inputDiv}>
                    <label>Password</label>
                    <input className="form-control" type="password" placeholder="Enter password" onChange={(event) => setPasswordInput(event.target.value)} />
                </div>
                <Button variant="contained" color="secondary" className="mb-3" type="submit">
                    Sign In
                </Button>

                {incorrectError && <Alert color='primary' variant="danger" >
                    Incorrect email or password. Try again!
                </Alert>}

                <p>
                    Haven't register? <a href="#" onClick={handleClick} >Sign Up</a>
                </p>
        </Box>
        </form>
        </Container>
        </>
    )
}

export default SignIn