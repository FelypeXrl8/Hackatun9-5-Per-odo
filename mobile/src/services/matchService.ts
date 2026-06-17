import { matches } from "../mocks/matches";

export function getMatches() {
  return matches;
}

export function getMatchById(id: string) {
  return matches.find((match) => match.id === id);
}
