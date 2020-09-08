import { Deck, Suit, Rank, Card } from './cards';

describe('Deck class', () => {
  it('should build a standard deck of playing cards', () => {
    const deck = new Deck();
    expect(deck.cards.length).toBe(52);
    expect(
      deck.cards.filter((card) => card.suit === Suit.Hearts).length
    ).toBe(13);
    expect(
      deck.cards.filter((card) => card.rank === Rank.Ace).length
    ).toBe(4);
  });
});

describe('Card class', () => {
  it('should compose an ID', () => {
    const c = new Card(Rank.Eight, Suit.Spades);
    expect(c.id).toEqual('card-7-3');
  });
});
