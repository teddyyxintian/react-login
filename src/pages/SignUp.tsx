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

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");

    const [completeError, setCompleteError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false)

    const inputDiv: CSS.Properties = {
        width: '400px',
      };

    function handleFormSubmit() {

        if (!email || !password || !confirmPw) {
            setCompleteError(true);
            setErrorMsg("Please complete the sign up form!")
        } else if (password !== confirmPw) {
            setPasswordError("*Confirm password doesn't match New password");
            setCompleteError(false);
        } else if (password.length < 8) {
            setPasswordError("*Password must have at least 8 characters");
            setCompleteError(false);
        } else {
            setCompleteError(false);
            setPasswordError("");

            let userInfo = {
                userEmail: email,
                userPw: password
            }

            interface UserData {
                userEmail: string;
                userPw: string;
            }

            let userData = localStorage.getItem('userList');
            let userDataList: UserData[] = userData ? JSON.parse(userData) : [];

            const isUserRegistered = userDataList.find((data) => data.userEmail === email);

            if (isUserRegistered) {
                setCompleteError(true);
                setErrorMsg("Email existed. Try another email!")
                return
            }

            userDataList.push(userInfo)
            localStorage.setItem("userList", JSON.stringify(userDataList));

            setIsSuccess(true)
        }

    }

    const navigate = useNavigate()
    function handleClick() {
        navigate('/');
    }
    
    return (
        <>
            <Container maxWidth="xs">
                <form onSubmit={handleFormSubmit}>
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
                        <h4 className="center">Sign Up</h4>
                        <div className="mb-3" style={inputDiv}>
                            <label>Email</label>
                            <input className="form-control" type="email" placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)} />
                        </div>

                        <div className="mb-3" style={inputDiv}>
                            <label>Password</label>
                            <input className="form-control" type="password" placeholder="Enter Password" onChange={(event) => setPassword(event.target.value)} />
                        </div>

                        <div className="mb-3" style={inputDiv}>
                            <label>Confirm Password</label>
                            <input className="form-control" type="password" placeholder="Enter Confirm Password" onChange={(event) => setConfirmPw(event.target.value)} />
                        </div>

                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    
                        <Button variant="contained" color="secondary" className="mb-3" type="submit">
                            Sign Up
                        </Button> 

                        {completeError &&
                            <Alert color='primary' variant="danger" >
                                { errorMsg }
                            </Alert>
                        }

                        {isSuccess &&
                            <Alert color='primary' variant="success" >
                                Sign up seccessful!
                            </Alert>
                        }

                        <p >
                            Already registered? <a href="#" onClick={handleClick} >Sign in</a>
                        </p>
                    </Box>
                </form>
            </Container>
        </>
    )
}

export default SignUp