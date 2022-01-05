import { PublicKey } from '@solana/web3.js';
import http from '../utils/http-common';

const fetch = (wallet?: PublicKey | null) => {
  const route = wallet ? `/elements/all?wallet=${wallet}` : '/elements/all';
  return http.get(route);
};

const ElementsService = {
  fetch,
};

export default ElementsService;
