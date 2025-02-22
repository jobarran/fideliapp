import { Card, UserCard } from "@/interfaces";

export function sortCards(cards: UserCard[]): UserCard[] {

  return cards.sort((a, b) => {
    if (a.favourite === b.favourite) {
      // If both cards are the same in terms of favourite, sort by points
      return b.points - a.points;
    }
    // Favourites come first
    return a.favourite ? -1 : 1;
  });
}