import React, { useState, Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  getCoinInfo,
  getCoinInfoAsync,
  getCoinsAsync,
  selectCoins,
  selectedCoin,
} from './counterSlice';
import styles from './Counter.module.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const tableStyles = {
  display: 'flex',
};

export function Counter() {
  const count = useSelector(selectCount);
  const allcoins = useSelector(selectCoins);
  const currentCoin = useSelector(selectedCoin);
  console.log('allcoins');
  console.log(allcoins);
  console.log('currentCoin.name');
  console.log(currentCoin.name);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;
  const { history } = currentCoin;

  //
  // const [addrtype, setAddrtype] = useState(['Work', 'Home', 'school']);
  // const Add = addrtype.map((Add) => Add);
  const handleCurrencyChange = (e) => {
    console.log(e.target.value);
    dispatch(getCoinsAsync(e.target.value));
  };

  const [fetchedCurrencies, setFetchedCurrencies] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      console.log('lets call currencies');
      // setFetchedCurrencies(await fetchCurrencies());
      console.log('      dispatch(getCoinInfoAsync())');
      dispatch(getCoinsAsync());
    };
    fetchAPI();
  }, [setFetchedCurrencies]);

  //const currencySelector = fetchedCurrencies ? (
  const currencySelector = allcoins ? (
    <select
      defaultValue=""
      //  onChange={(e) => handleCurrencyChange(e.target.value)}
      onChange={(e) => handleCurrencyChange(e)}
    >
      <option value={allcoins[0].name}>{allcoins[0].name}</option>
      {allcoins.map((coin, i) => {
        return (
          <option key={i} value={coin.name}>
            {coin.name}
          </option>
        );
      })}
    </select>
  ) : (
    <p>
      You have reach limit of API request, please wait 1 minute and refresh page{' '}
    </p>
  );
  //
  return (
    <div>
      <p>Select Currency</p>
      {currencySelector}
      <p>Selected currency is: {currentCoin.name}</p>
      <p>Symbol: {currentCoin.symbol}</p>
      {/* <p>Description: {currentCoin.description}</p> */}

      <p>
        iconUrl: <img src={currentCoin.iconUrl} width={20} height={20} />{' '}
        {/* {currentCoin.iconUrl} */}
      </p>
      <p>websiteUrl: {currentCoin.websiteUrl}</p>
      <p>volume: {currentCoin.volume}</p>
      <p>marketCap: {currentCoin.marketCap}</p>
      <p>rank: {currentCoin.rank}</p>
      <p>price: {currentCoin.price}</p>
      {/* <p>allTimeHigh: {currentCoin.allTimeHigh}</p> */}
      {allcoins && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>rank</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Market Cap</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Total Supply</TableCell>
                {/* <TableCell align="right">Last 7 Days</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {allcoins.map((coin) => (
                <TableRow
                  key={coin.rank}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {coin.rank}
                  </TableCell>
                  <TableCell align="right">
                    <div style={tableStyles}>
                      <img src={coin.iconUrl} width={20} height={20} />
                      &nbsp;
                      {coin.name} &nbsp;
                      {coin.symbol}
                    </div>
                  </TableCell>
                  <TableCell align="right">{coin.price}</TableCell>
                  <TableCell align="right">{coin.marketCap}</TableCell>
                  <TableCell align="right">{coin.volume}</TableCell>
                  <TableCell align="right">{coin.totalSupply}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
