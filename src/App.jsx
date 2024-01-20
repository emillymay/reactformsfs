
import './App.css'
import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import React from 'react';
import { useState } from 'react';
import viteReact from '@vitejs/plugin-react';

export default function App() {
 
const [token, setToken] = useState(null);

return (
    <>
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} />

    </>
  );
}


 