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
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);
  const allcoins = useSelector(selectCoins);
  console.log('allcoins');
  console.log(allcoins);
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
      {currencySelector}
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
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(getCoinInfo())}
        >
          Get Coins
        </button>
        {/* <button
          className={styles.button}
          onClick={() => dispatch(getCoinInfoAsync())}
        >
          GetCoins Async
        </button> */}
      </div>
    </div>
  );
}
