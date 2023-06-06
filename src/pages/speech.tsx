import React from 'react';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import Speech from '@/components/Speech';

export default function SpeechPage() {
  return (
    <div>
      <NavBar />
      <Speech />
    </div>
  );
}
