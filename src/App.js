import React from "react";
import ChampionCard from "./components/card"
import PlayerData from "./components/player_data";

function App() {
  return (
    <div className="container">
      <div className="champion-grid">
        <PlayerData />
        <ChampionCard />
      </div>
    </div>
  );
}

export default App;
