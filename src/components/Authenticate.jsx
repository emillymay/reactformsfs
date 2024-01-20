import React, { useEffect, useState } from "react";

export default function Authenticate({ token }) {
  const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState(null);
 
    useEffect(() => {
    
    if (token) {
      authenticateWithToken(token);
    }
  }, [token]);

  const authenticateWithToken = async (token) => {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setAuthenticated(false);
    }
  };

  const handleClick = async () => {
    try {
      // Make a GET request to the /authenticate endpoint
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Handle successful response
        const result = await response.json();
  
        // Check if the result has a message property
        if (result.message) {
          // Store the message in the successMessage state
          setSuccessMessage(result.message);
  
          // Display the username if available in the data property
          if (result.data && result.data.username) {
            setUsername(result.data.username);
          }
        }
      } else {
        // Handle error response
        console.error("Request failed");
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error during network request:", error);
      setError(error.message); // Set the error state with the error message
    }
  };
  
  

  return (
    <div>
      <h2>Authenticate!</h2>
      <p>{authenticated ? "Authenticated" : "Not Authenticated"}</p>
      
      {error && <p>Error: {error}</p>}
    
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}
