// Home.tsx
import React, { useState, useEffect } from "react";

const UserVisite = () => {
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => console.log("Visit tracked:", data))
      .catch((error) => console.error("Error tracking visit:", error));
  }, []);

  return (
    <div>
      <h1>Welcome to the App</h1>
    </div>
  );
};

export default UserVisite;
