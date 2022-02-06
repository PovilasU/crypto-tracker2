import React, { useState, Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { getCoinsAsync, selectCoins, selectedCoin } from './counterSlice';
import styles from './Counter.module.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { coinsjson } from '../coins';

const tableStyles = {
  display: 'flex',
};

export function Counter() {
  const allcoins = useSelector(selectCoins);
  // const allcoins = coinsjson.data.coins;
  // console.log('what is allcoins');
  // console.log(allcoins);
  const currentCoin = useSelector(selectedCoin);
  const dispatch = useDispatch();

  const handleCurrencyChange = (e) => {
    dispatch(getCoinsAsync(e.target.value));
  };

  const [fetchedCurrencies, setFetchedCurrencies] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      dispatch(getCoinsAsync());
    };
    fetchAPI();
  }, [setFetchedCurrencies]);

  const currencySelector = allcoins ? (
    <select defaultValue="" onChange={(e) => handleCurrencyChange(e)}>
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
      <h1>Crypto currencies</h1>
      {allcoins && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Market Cap</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Total Supply</TableCell>
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
