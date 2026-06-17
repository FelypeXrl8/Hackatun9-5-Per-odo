import { bets } from "../mocks/bets";

type SaveBetData = {
  matchId: string;
  goalsA: string;
  goalsB: string;
};

export function getMyBets() {
  return bets;
}

export function saveBet(data: SaveBetData) {
  return {
    id: Date.now(),
    matchId: data.matchId,
    goalsA: data.goalsA,
    goalsB: data.goalsB,
    message: "Palpite salvo com sucesso",
  };
}
