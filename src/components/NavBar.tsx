import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
} from "@mui/material";
import logo from "../images/logo.png";
import "../App.css";
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
    <AppBar position="static" elevation={0}>
      <Toolbar
        sx={{ minHeight: "90px", display: "flex", alignItems: "flex-end" }}
      >
        <IconButton 
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
        </IconButton>
        <Button
          color="inherit"
          onClick={handleConversation}
        >
          Conversation
        </Button>
        <Button
          color="inherit"
          onClick={handleSpeech}
        >
          Speech
        </Button>
        <Button
          color="inherit"
          onClick={()=>{handleAboutUS()}}
        >
          About Us
        </Button>
        <Button
          color="inherit"
          onClick={()=>{handleContact()}}
        >
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
