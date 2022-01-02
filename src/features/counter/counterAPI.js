import axios from 'axios';
// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

const dummyCoindata = {
  coin: 'bitcoin',
  price: 9999,
};

const bitcoindata2 = {
  data: {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    supply: '18899056.0000000000000000',
    maxSupply: '21000000.0000000000000000',
    marketCapUsd: '957147621021.5708437175117360',
    volumeUsd24Hr: '12580846552.7650603187647585',
    priceUsd: '50645.2608543818719685',
    changePercent24Hr: '3.6802692944503915',
    vwap24Hr: '49408.6501943061983328',
    explorer: 'https://blockchain.info/',
  },
  timestamp: 1639334596796,
};

export function fetchCoinInfo(dummyCoin = dummyCoindata) {
  //  const url = 'https://api.coincap.io/v2/assets/bitcoin';

  try {
    // const res = fetch(url);
    // const { data } = res.json();
    // console.log('data');
    // console.log(data);

    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const data = res.data;
      console.log('DATA IS:');
      console.log(data);
      return data;
    });

    // return data.map((currency) => currency.id);
  } catch (error) {
    console.log(error);
  }

  // return new Promise((resolve) =>
  //   setTimeout(() => resolve({ data: dummyCoin }), 500)
  // );
}
