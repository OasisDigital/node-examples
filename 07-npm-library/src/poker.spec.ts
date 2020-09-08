import { Card, Rank, Suit } from './cards';
import { evaluateHandCategory, PokerHandCategory } from './poker';

describe('The poker module', () => {
  it('should recognize a straight flush', () => {
    const hand: Card[] = [
      new Card(Rank.Four, Suit.Hearts),
      new Card(Rank.Eight, Suit.Hearts),
      new Card(Rank.Six, Suit.Hearts),
      new Card(Rank.Seven, Suit.Hearts),
      new Card(Rank.Five, Suit.Hearts),
    ];
    expect(evaluateHandCategory(hand)).toBe(
      PokerHandCategory.StraightFlush
    );
  });
});
