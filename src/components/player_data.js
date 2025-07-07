import React, { useEffect, useState } from "react";

export default function PlayerData() {
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  const riotApiKey = "RGAPI-d0aeb01d-fcb7-4f18-9c9f-8590c5c3cf18";
  const gameName = "IGhunny";
  const tagLine = "IGF";

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const accountRes = await fetch(
          `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
          {
            headers: {
              "X-Riot-Token": riotApiKey,
            },
          }
        );

        if (!accountRes.ok) throw new Error("Failed to fetch account data");
        const account = await accountRes.json();

        const summonerRes = await fetch(
          `https://vn2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${account.puuid}`,
          {
            headers: {
              "X-Riot-Token": riotApiKey,
            },
          }
        );

        if (!summonerRes.ok) throw new Error("Failed to fetch summoner data");
        const summoner = await summonerRes.json();

        // Save data to state
        setPlayer({
          name: account.gameName,
          tag: account.tagLine,
          iconId: summoner.profileIconId,
          level: summoner.summonerLevel,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlayerData();
  }, []);


  if (error) return <p>Error: {error}</p>;
  if (!player) return <p>Loading...</p>;

  return (
    <>
    <header
      className="player-header-wrapper"
      style={{ backgroundColor: "#31313c" }}
    >
      <div className="player-profile">
        <div className="icon-wrapper">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/profileicon/${player.iconId}.png`}
            alt="Summoner Icon"
            className="player-icon"
          />
          <span className="level-badge">{player.level}</span>
        </div>

        <div className="player-details">
          <div className="player-name-row">
            <h2 className="player-name">{player.name}</h2>
            <span className="player-tag"> #{player.tag}</span>
          </div>

          <img
            src="https://flagcdn.com/w40/vn.png"
            alt="VN"
            className="region-flag"
          />
        </div>
      </div>
    </header>

    <section className="ranked-card">
    <h3 className="ranked-title">Xếp hạng Đơn/Đôi</h3>
    <div className="ranked-main">
      <img
        className="ranked-icon"
        src="https://opgg-static.akamaized.net/images/medals/iron_4.png"
        alt="Iron 4"
      />
      <div className="ranked-info">
        <div className="ranked-tier">
          <span className="tier-name">Iron 4</span>
          <span className="lp">54 LP</span>
        </div>
        <div className="ranked-record">81T 106B</div>
        <div className="ranked-winrate">Tỉ lệ thắng 43%</div>
      </div>
    </div>
    </section>

    </>
  );
}
