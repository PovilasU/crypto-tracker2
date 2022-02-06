import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
const initialState = {
  selectedCoin: '',
  value: 0,
  status: 'idle',
  coininfo: 'nothing',
  cointstatus: 'idle coinstatus',
  allcoins: '',
};

export const getCoinsAsync = createAsyncThunk(
  'counter/getCoins',
  async (name = 'Bitcoin') => {
    const options = {
      method: 'GET',
      // url: 'https://coinranking1.p.rapidapi.com/coins',
      url: 'https://api.coinranking.com/v2/coins',
      headers: {
        'x-access-token':
          'coinrankingd4e06d9b7f718cb51194bea6042a7ee77e54a34008c2ade2',
        'Access-Control-Allow-Origin': '*',
        // 'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        // 'x-rapidapi-key': 'a04a42f516msh9ddeba91e46f3ffp148a0fjsn2f56e34b16d1',
      },
    };

    const data = axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return { allcoins: response.data.data, selectedCoin: name };
      })
      .catch(function (error) {
        console.error(error);
      });

    return data;
  }
);

export const coinSlice = createSlice({
  name: 'CryptoTracker',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getCoinInfo: (state) => {
      state.coininfo = 'test text';
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder

      .addCase(getCoinsAsync.pending, (state) => {
        state.cointstatus = 'loading getcoins';
      })
      .addCase(getCoinsAsync.fulfilled, (state, action) => {
        state.cointstatus = 'idle getcoins';
        state.allcoins = action.payload.allcoins;

        const index = action.payload.allcoins.coins.findIndex(
          (coin) => coin.name === action.payload.selectedCoin
        );
        state.selectedCoin = action.payload.allcoins.coins[index];
      });
  },
});

export const { getCoinInfo } = coinSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;
export const selectedCoin = (state) => state.counter.selectedCoin;
export const selectCoins = (state) => state.counter.allcoins.coins;

export default coinSlice.reducer;
