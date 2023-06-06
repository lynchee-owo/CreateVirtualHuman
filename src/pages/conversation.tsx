import React from 'react';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import Conversation from '@/components/Conversation';

export default function ConversationPage() {
  return (
    <div>
      <NavBar />
      <Conversation />
    </div>
  );
}