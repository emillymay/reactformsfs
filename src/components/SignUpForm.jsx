import React, { useState } from "react";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Handle successful response
        const result = await response.json();
        setSuccessMessage(result.message);
      } else {
        // Handle error response
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error during API call:", error);
      setError("An unexpected error occurred.");
    }
  };
  

  return (
    <div>
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
