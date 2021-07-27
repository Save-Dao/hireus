import { createClient, dedupExchange, fetchExchange } from 'urql';

export const CLIENT = createClient({
  url: 'https://api.thegraph.com/subgraphs/name/slgraham/guildauctionqueues-rinkeby' ?? '',
  exchanges: [dedupExchange, fetchExchange],
});