import { ChangeEvent, FormEvent, useState } from 'react';
import { Typography, Button } from "@mui/material";

const LandingPage = () => {
    const handleStart = () => {
        console.log("handle start");
        // On click, directs to Speech page
    }
    return (
        // background use a gif picture, could be something floating or moving.
        <div>
            <Typography size="h2" > Welcome to EduTalk </Typography>
            <Button onClick={handleStart}> Start </Button> {/* add a rocket icon. */}
        </div>
        // Create a module and text describing the vision of our product. What it does. Reference the "Hello History" landing page.
    )
}

export default LandingPage;