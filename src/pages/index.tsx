// src/pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import LandingPage from '../components/LandingPage';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Head>
        <title>EduTalk</title>
        <meta name="description" content="Create an AI Talking Head" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center gap-4">
        <NavBar />
        <LandingPage />
      </main>
    </div>
  );
};

export default Home;
