import { useState } from 'react';
import { Typography, Button } from "@mui/material";
import { useRouter } from 'next/router';
import { RocketOutlined } from '@mui/icons-material';

const LandingPage = () => {
    const router = useRouter();

    const handleStart = () => {
        console.log("handle start");
        router.push("/speech");
    }

    return (
        <div style={{backgroundImage: 'url(https://images.unsplash.com/photo-1646038572806-a9736b3ebb2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80)', backgroundSize: 'cover', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant="h2" style={{color: 'white', marginBottom: '20px'}}> Welcome to EduTalk </Typography>
            <Typography variant="body1" style={{color: 'white', marginBottom: '40px', textAlign: 'center', width: '60%'}}>
              EduTalk is a revolutionary AI product that brings historical figures to life. Upload a photo, provide a voice, and let our AI animate the figure, making it ready to answer your questions. Experience the thrill of interacting with history!
            </Typography>
            <Button variant="contained" endIcon={<RocketOutlined />} onClick={handleStart}> Start </Button> {/* add a rocket icon. */}
        </div>
    )
}

export default LandingPage;
