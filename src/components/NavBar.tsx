import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
} from "@mui/material";
import Image from 'next/image';
import { useRouter } from 'next/router';

function NavBar() {
  const router = useRouter();

  const handleLogoClick = () => {
    if (router.pathname === "/") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };

  const handleSpeech = () => {
    router.push("/speech");
  };

  const handleConversation = () => {
    router.push("/conversation");
  };

  const handleAboutUS = () => {
    console.log("show about us");
  };

  const handleContact = () => {
    console.log("show contact email and twitter");
  };

  return (
    <AppBar position="static" elevation={0} style={{backgroundColor: '#FFFFFF'}}>
      <Toolbar
        sx={{ minHeight: "90px", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}
      >
        {/* <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="logo" 
          className="cursor-pointer" 
          onClick={handleLogoClick}
        >
          <Image
            src={logo}
            alt="Logo"
            style={{ height: "40px", width: "auto" }}
          />
        </IconButton> */}
        <Button
          style={{color: '#800080'}}
          onClick={handleConversation}
        >
          Conversation
        </Button>
        <Button
          style={{color: '#800080'}}
          onClick={handleSpeech}
        >
          Speech
        </Button>
        <Button
          style={{color: '#800080'}}
          onClick={()=>{handleAboutUS()}}
        >
          About Us
        </Button>
        <Button
          style={{color: '#800080'}}
          onClick={()=>{handleContact()}}
        >
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
