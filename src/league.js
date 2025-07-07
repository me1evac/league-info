import React from 'react';
import ChampionCard from "./components/card"
import PlayerData from "./components/player_data";

export default function LeaguePlayerData() {
  return (
    <div className="container">
          <div className="champion-grid">
            <PlayerData gameName="IGhunny" tagLine="IGF"/>
            <ChampionCard />
          </div>
    </div>
  )
}
