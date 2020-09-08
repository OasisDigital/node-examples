import { Card, Rank } from './cards';

export enum PokerHandCategory {
  HighCard,
  Pair,
  TwoPair,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  FourOfAKind,
  StraightFlush,
  RoyalFlush,
}

type CatMap = { [S in PokerHandCategory]: string };

const catMap: CatMap = {
  [PokerHandCategory.HighCard]: 'High Card',
  [PokerHandCategory.Pair]: 'Pair',
  [PokerHandCategory.TwoPair]: 'Two Pair',
  [PokerHandCategory.ThreeOfAKind]: 'Three of a Kind',
  [PokerHandCategory.Straight]: 'Straight',
  [PokerHandCategory.Flush]: 'Flush',
  [PokerHandCategory.FullHouse]: 'Full House',
  [PokerHandCategory.FourOfAKind]: 'Four of a Kind',
  [PokerHandCategory.StraightFlush]: 'Straight Flush',
  [PokerHandCategory.RoyalFlush]: 'Royal Flush',
};

export class PokerHand {
  constructor(public category: PokerHandCategory) {}

  get display(): string {
    return catMap[this.category];
  }
}

export function evaluateHandCategory(
  originalHand: Card[]
): PokerHandCategory {
  if (originalHand.length !== 5) {
    throw 'Must have exactly 5 cards in hand!';
  }
  const hand = [...originalHand];
  hand.sort((a, b) => a.rank - b.rank);

  const isStraight = hand.every((card, index, cards) => {
    return (
      index === 0 ||
      card.rank === cards[index - 1].rank + 1 ||
      (card.rank === Rank.Ten && cards[index - 1].rank === Rank.Ace)
    );
  });

  const isFlush = hand.every(
    (card, _, cards) => card.suit === cards[0].suit
  );

  const counts = new Array(13);
  hand.forEach(
    (card) => (counts[card.rank] = (counts[card.rank] || 0) + 1)
  );
  const sets = counts
    .filter((count) => count > 1)
    .sort((a, b) => b - a);

  if (isStraight && isFlush) {
    if (hand[0].rank === Rank.Ace && hand[4].rank === Rank.King) {
      return PokerHandCategory.RoyalFlush;
    }
    return PokerHandCategory.StraightFlush;
  }
  if (sets.length === 1 && sets[0] === 4) {
    return PokerHandCategory.FourOfAKind;
  }
  if (sets.length === 2 && sets[0] === 3 && sets[1] === 2) {
    return PokerHandCategory.FullHouse;
  }
  if (isFlush) return PokerHandCategory.Flush;
  if (isStraight) return PokerHandCategory.Straight;
  if (sets.length === 1 && sets[0] === 3) {
    return PokerHandCategory.ThreeOfAKind;
  }
  if (sets.length === 2 && sets[0] === 2 && sets[1] === 2) {
    return PokerHandCategory.TwoPair;
  }
  if (sets.length === 1 && sets[0] === 2) {
    return PokerHandCategory.Pair;
  }
  return PokerHandCategory.HighCard;
}

export function evaluateHand(hand: Card[]): PokerHand {
  const category = evaluateHandCategory(hand);
  return new PokerHand(category);
}
