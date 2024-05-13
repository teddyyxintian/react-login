import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Button,
    Container,
  } from "@mui/material";

function Home() {
  const [dummy, setDummy] = useState([]);

  useEffect(() => {
    const getDummy = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();
      setDummy(data);
    };
    getDummy();
  }, []);

  const navigate = useNavigate()
    function handleClick() {
        navigate('/');
    }

  return (
    <Container maxWidth="xl">
        <div>
            {dummy.map((todo:any) => (
                <div key={todo.id}>
                    <h4>{todo.title}</h4>
                    <p>{todo.body}</p>
                </div>
            ))}
            <Button variant="contained" color="secondary" className="mb-3"  onClick={handleClick}>
                Sign Out
            </Button> 
        </div>
    </Container>
  );
}

export default Home