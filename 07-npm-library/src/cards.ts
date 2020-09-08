import { shuffle } from 'd3-array';

export enum Suit {
  Hearts = 0,
  Diamonds,
  Clubs,
  Spades,
}

export enum Rank {
  Ace,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
}

type ShortRankMap = { [S in Rank]: string };

const shortRankMap: ShortRankMap = {
  [Rank.Ace]: 'Ace',
  [Rank.Two]: '2',
  [Rank.Three]: '3',
  [Rank.Four]: '4',
  [Rank.Five]: '5',
  [Rank.Six]: '6',
  [Rank.Seven]: '7',
  [Rank.Eight]: '8',
  [Rank.Nine]: '9',
  [Rank.Ten]: '10',
  [Rank.Jack]: 'Jack',
  [Rank.Queen]: 'Queen',
  [Rank.King]: 'King',
};

export class Card {
  constructor(public rank: Rank, public suit: Suit) {}

  get id(): string {
    return 'card-' + this.rank + '-' + this.suit;
  }

  get display(): string {
    return `${Rank[this.rank]} of ${Suit[this.suit]}`;
  }

  get suitDisplay(): string {
    return Suit[this.suit];
  }

  get rankDisplay(): string {
    return shortRankMap[this.rank];
  }
}

export class Deck {
  cards: Card[] = [];
  constructor() {
    for (let rank = 0; rank <= 12; rank++) {
      for (let suit = 0; suit <= 3; suit++) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  shuffle(): void {
    shuffle(this.cards);
  }
}

export function cardFromId(id: string): Card {
  const [, rank, suit] = id.split('-');
  return new Card(+rank, +suit);
}
