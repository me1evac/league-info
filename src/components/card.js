import React, { useState, useEffect } from "react";

const API_KEY = `RGAPI-d0aeb01d-fcb7-4f18-9c9f-8590c5c3cf18`;
const masteryUrl = `https://vn2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/Esk4q_dyzd9KaVNl875_6QhltP_vIJrMWhjJpj4gK6rFIX2gl1FD0tyZ2emb-ZqBnYx0ME-ay2O6zw/top`;
const championDataUrl = `https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion.json`;
const version = "14.13.1";

export default function ApiData() {
  const [data, setData] = useState(null);
  const [championMap, setChampionMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch top mastery data
        const masteryRes = await fetch(masteryUrl, {
          headers: {
            "X-Riot-Token": API_KEY,
          },
        });
        const masteryJson = await masteryRes.json();
        setData(masteryJson);

        // Fetch champion info
        const champRes = await fetch(championDataUrl);
        const champJson = await champRes.json();
        const champMap = {};

        Object.values(champJson.data).forEach(champ => {
          champMap[parseInt(champ.key)] = {
            name: champ.id,
            image: champ.image.full,
          };
        });

        setChampionMap(champMap);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAllData();
  }, []);

  const getRankColor = (rank) => {
    if (rank === 1) return "#facc15";
    if (rank === 2) return "#ff3842";
    if (rank === 3) return "#88018c";
    return "#754501";
  };

  return (
    <>
    <h3>Top tướng</h3>
    <div className="champion-container">
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data ? (
        data.map((champ, index) => {
          const champInfo = championMap[champ.championId];
          const rank = index + 1;
          const color = getRankColor(rank);

          return (
            <div className="champion-card" key={index}>
              <div className="champion-rank" style={{ color }}>
                {rank}
              </div>

              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champInfo?.image}`}
                alt={champInfo?.name || "Unknown"}
              />

              <div className="champion-info">
                <span className="champion-name">{champInfo?.name || "Unknown"}</span>
                <span className="champion-kda">Cấp thông thạo: {champ.championLevel}</span>
              </div>

              <div className="champion-mastery" style={{ color }}>
                {champ.championPoints.toLocaleString()} điểm
              </div>
            </div>
          );
        })
      ) : (
        <p>Getting player infomation........</p>
      )}
    </div>
  </>
  );
}
