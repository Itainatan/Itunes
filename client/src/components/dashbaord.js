import React, { useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState("Harry");
  const [surename, setSureName] = useState("potter");

  const handleNameChange = e => {
    setName(e.target.value);
  };
  const handleSureChange = e => {
    setSureName(e.target.value);
  };
  return (
    <div>
      <h1>Dashboard Page</h1>
      <div>
        <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        <input value={surename} onChange={handleSureChange} />
      </div>
    </div>
  );
};

export default Dashboard;
