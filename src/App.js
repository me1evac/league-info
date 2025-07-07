import React, { useState } from "react";
import LeaguePlayerData from "./league";
import TFTData from "./tft";

function App() {
  const [showLeague, setShowLeague] = useState(true);

  return (
    <div>
      <div style={{ textAlign: "center", margin: "1rem" }}>
        <button
          onClick={() => setShowLeague((prev) => !prev)}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#334155",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {showLeague ? "Chuyển sang TFT" : "Chuyển sang Liên Minh"}
        </button>
      </div>

      {showLeague ? <LeaguePlayerData /> : <TFTData />}
    </div>
  );
}

export default App;
