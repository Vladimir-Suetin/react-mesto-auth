const cohort = 'cohort-52';
const token = '6692dfb4-7777-450f-b6ba-68fb20b8c9ff';

const apiConfig = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
  headers: { authorization: token, 'Content-Type': 'application/json' },
};

export default apiConfig;
