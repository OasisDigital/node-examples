import { languageCheck, OK } from './filter';

describe('Language check logic', () => {
  it('Allows empty chat', () => {
    expect(languageCheck('')).toBe(OK);
  });

  it('Allows dog discussion', () => {
    expect(languageCheck('Heh nice dog')).toBe(OK);
  });

  it('Disallows cat discussion', () => {
    expect(languageCheck('Your cat is purring')).toBe(
      'Cats may not be discussed.'
    );
  });
});
