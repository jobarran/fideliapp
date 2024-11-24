import { Card } from "@/interfaces";

export function sortCards(cards: Card[]): Card[] {

  console.log("sorting")

  return cards.sort((a, b) => {
    if (a.favourite === b.favourite) {
      // If both cards are the same in terms of favourite, sort by points
      return b.points - a.points;
    }
    // Favourites come first
    return a.favourite ? -1 : 1;
  });
}