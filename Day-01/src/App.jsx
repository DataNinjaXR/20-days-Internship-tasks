import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SummaryCard from "./components/SummaryCard";
import "./App.css";

function App() {
  const [users, setUsers] = useState(120);
  const [message, setMessage] = useState("Here is your dashboard overview.");

  return (
    <div>
      <Header />

      <div className="layout">
        <Sidebar />

        <main className="content">
          <h1>Dashboard Overview</h1>
          <p>{message}</p>

          <button onClick={() => setMessage("You are learning React!")}>
            Change Message
          </button>

          <div className="cards">
            <SummaryCard title="Total Users" value={users} />
            <SummaryCard title="Total Orders" value={80} />
            <SummaryCard title="Total Sales" value="$500" />
          </div>

          <button onClick={() => setUsers(users + 1)}>
            Add User
          </button>
        </main>
      </div>
    </div>
  );
}

export default App;
