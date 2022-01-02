import React, { useState, Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
      {/* <select
        onChange={(e) => handleAddrTypeChange(e)}
        className="browser-default custom-select"
      >
        {Add.map((address, key) => (
          <option key={key} value={key}>
            {address}
          </option>
        ))}
      </select> */}
    </div>
  );
}
