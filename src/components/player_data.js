import React, { useEffect, useState } from "react";

export default function PlayerData({gameName, tagLine}) {
  const [player, setPlayer] = useState(null);
  const [ranked, setRanked] = useState(null);
  const [error, setError] = useState(null);

  const riotApiKey = "RGAPI-d0aeb01d-fcb7-4f18-9c9f-8590c5c3cf18";
  // const gameName = "Hakuna Matata";
  // const tagLine = "kiaya";

  //IGhunny#IGF

  const vietnameseTier = {
    IRON: "Sắt",
    BRONZE: "Đồng",
    SILVER: "Bạc",
    GOLD: "Vàng",
    PLATINUM: "Bạch Kim",
    EMERALD: "Lục Bảo",
    DIAMOND: "Kim Cương",
    MASTER: "Cao Thủ",
    GRANDMASTER: "Đại Cao Thủ",
    CHALLENGER: "Thách Đấu",
  };

  const getRankColor = (tier) => {
    const colors = {
      IRON: "#3b3b3b",
      BRONZE: "#5a3825",
      SILVER: "#6e7b8b",
      GOLD: "#b8860b",
      PLATINUM: "#26938a",
      EMERALD: "#33b97a",
      DIAMOND: "#1e90ff",
      MASTER: "#af46d3",
      GRANDMASTER: "#e03b3b",
      CHALLENGER: "#ffcc00",
    };
    return colors[tier] || "#1e1e2f";
  };

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

        setPlayer({
          name: account.gameName,
          tag: account.tagLine,
          iconId: summoner.profileIconId,
          level: summoner.summonerLevel,
          puuid: account.puuid,
        });

        const rankRes = await fetch(
          `https://vn2.api.riotgames.com/lol/league/v4/entries/by-puuid/${account.puuid}`,
          {
            headers: {
              "X-Riot-Token": riotApiKey,
            },
          }
        );
        if (!rankRes.ok) throw new Error("Failed to fetch ranked data");
        const ranks = await rankRes.json();

        const soloRank = ranks.find(
          (entry) => entry.queueType === "RANKED_SOLO_5x5"
        );

        if (soloRank) {
          setRanked({
            tier: soloRank.tier,
            rank: soloRank.rank,
            lp: soloRank.leaguePoints,
            wins: soloRank.wins,
            losses: soloRank.losses,
            winrate: Math.round(
              (soloRank.wins / (soloRank.wins + soloRank.losses)) * 100
            ),
          });
        } else {
          setRanked(null);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlayerData();
  }, [gameName, tagLine]);

  if (error) return <p color="red">Error: {error}</p>;
  if (!player) return <p>Loading...</p>;

  return (
    <>
      <header className="player-header-wrapper">
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
              <span className="player-tag">#{player.tag}</span>
            </div>

            <img
              src="https://flagcdn.com/w40/vn.png"
              alt="VN"
              className="region-flag"
            />
          </div>
        </div>
      </header>

      <section
        className="ranked-card"
        style={{
          backgroundColor: ranked ? getRankColor(ranked.tier) : "#1e1e2f",
        }}
      >
        <h3 className="ranked-title">Xếp hạng Đơn/Đôi</h3>

        {ranked ? (
          <div className="ranked-main">
            <img
              className="ranked-icon"
              src={`https://opgg-static.akamaized.net/images/medals_new/${ranked.tier.toLowerCase()}.png`}
              alt={`${ranked.tier} ${ranked.rank}`}
            />
            <div className="ranked-info">
              <div className="ranked-tier">
                <span className="tier-name">
                  {vietnameseTier[ranked.tier]} {ranked.rank}
                </span>
                <span className="lp">{ranked.lp} LP</span>
              </div>
              <div className="ranked-record">
                {ranked.wins}T {ranked.losses}B
              </div>
              <div className="ranked-winrate">
                Tỉ lệ thắng {ranked.winrate}%
              </div>
            </div>
          </div>
        ) : (
          <p style={{ marginTop: "1rem", color: "#999" }}>Chưa có xếp hạng</p>
        )}
      </section>
    </>
  );
}


