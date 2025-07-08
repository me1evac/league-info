import React, { useState, useEffect } from "react";

// Replace this API key with yours
const API_KEY = `RGAPI-1ffd7b05-1c6d-425a-b9a7-4013e0cb0ca1`;
const puuid = "Esk4q_dyzd9KaVNl875_6QhltP_vIJrMWhjJpj4gK6rFIX2gl1FD0tyZ2emb-ZqBnYx0ME-ay2O6zw";

const masteryUrl = `https://vn2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top`;
const championDataUrl = `https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion.json`;
const version = "14.13.1";

export default function ApiData() {
  const [data, setData] = useState(null);
  const [championMap, setChampionMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const masteryRes = await fetch(masteryUrl, {
          headers: {
            "X-Riot-Token": API_KEY,
          },
        });

        if (!masteryRes.ok) {
          throw new Error("Failed to fetch mastery data");
        }

        const masteryJson = await masteryRes.json();

        // Safety: ensure it's an array
        if (!Array.isArray(masteryJson)) {
          throw new Error("Invalid mastery data format");
        }

        setData(masteryJson);

        // Fetch champion details
        const champRes = await fetch(championDataUrl);
        const champJson = await champRes.json();

        const champMap = {};
        Object.values(champJson.data).forEach((champ) => {
          champMap[parseInt(champ.key)] = {
            name: champ.id,
            image: champ.image.full,
          };
        });

        setChampionMap(champMap);
      } catch (err) {
        console.error("Fetch error:", err);
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
        {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}

        {Array.isArray(data) ? (
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
          <p>Đang tải dữ liệu tướng...</p>
        )}
      </div>
    </>
  );
}
