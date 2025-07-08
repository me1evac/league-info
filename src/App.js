import React, { useState } from "react";
import LeaguePlayerData from "./League/league";
import TFTData from "./tft";

function App() {
  const [activeTab, setActiveTab] = useState("league");

  return (
    <div>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "1rem 1.5rem",
          backgroundColor: "#1e293b",
          borderBottom: "2px solid #334155",
          gap: "1rem",
          marginBottom: "1rem"
        }}
      >
        <button
          onClick={() => setActiveTab("league")}
          style={{
            backgroundColor: activeTab === "league" ? "#334155" : "transparent",
            color: "#fff",
            border: "none",
            padding: "0.6rem 1rem",
            fontSize: "1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          League of Legends
        </button>

        <button
          onClick={() => setActiveTab("tft")}
          style={{
            backgroundColor: activeTab === "tft" ? "#334155" : "transparent",
            color: "#fff",
            border: "none",
            padding: "0.6rem 1rem",
            fontSize: "1rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
           Teamfight Tactics
        </button>
      </nav>
      <main>
        {activeTab === "league" ? <LeaguePlayerData /> : <TFTData />}
      </main>
    </div>
  );
}

export default App;
