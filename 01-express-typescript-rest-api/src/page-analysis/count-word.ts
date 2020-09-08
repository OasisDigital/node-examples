import axios from 'axios';

export async function countWord(
  url: string,
  word: string
): Promise<number> {
  const resp = await axios({
    method: 'get',
    url,
    responseType: 'text',
  });

  const re = new RegExp(word, 'gi');
  return (resp.data.match(re) || []).length;
}
