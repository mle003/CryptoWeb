import React, { useEffect, useState, useRef } from "react";

const Info = () => {
  const [currentCur, setCurrentCur] = useState('')
  const [bnEthAsk, setbnEthAsk] = useState(0)
  const [bnEthBid, setbnEthBid] = useState(0)
  const [bnBtcAsk, setbnBtcAsk] = useState(0)
  const [bnBtcBid, setbnBtcBid] = useState(0)
  const [cbEthAsk, setcbEthAsk] = useState(0)
  const [cbEthBid, setcbEthBid] = useState(0)
  const [cbBtcAsk, setcbBtcAsk] = useState(0)
  const [cbBtcBid, setcbBtcBid] = useState(0)
  const ws = useRef(null)
  const ws2 = useRef(null)
  const ws3 = useRef(null)
  const ws4 = useRef(null)
  let first = useRef(false);

  useEffect(() => {
    ws3.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    // first.current = true
  }, [])

  useEffect(() => {
    if (!first.current) {
      first.current = true
      return;
    }


    if (currentCur === 'btc') {
      let unsubMsg = {
        type: "unsubscribe",
        product_ids: ["ETH-USDT"],
        channels: ["ticker"]
      };
      let msg = {
        type: "subscribe",
        product_ids: ["BTC-USDT"],
        channels: ["ticker"]
      };
      let unsub = JSON.stringify(unsubMsg);
      ws3.current.send(unsub);
      let jsonMsg = JSON.stringify(msg);
      ws3.current.send(jsonMsg);
      ws3.current.onmessage = (e) => {
        let data = JSON.parse(e.data);
        setcbBtcAsk(data.best_ask)
        setcbBtcBid(data.best_bid)
      };
    }

    if (currentCur === 'eth') {
      let unsubMsg = {
        type: "unsubscribe",
        product_ids: ["BTC-USDT"],
        channels: ["ticker"]
      };
      let msg = {
        type: "subscribe",
        product_ids: ["ETH-USDT"],
        channels: ["ticker"]
      };
      let unsub = JSON.stringify(unsubMsg);
      ws3.current.send(unsub);
      let jsonMsg = JSON.stringify(msg);
      ws3.current.send(jsonMsg);
      ws3.current.onmessage = (e) => {
        let data = JSON.parse(e.data);
        setcbEthAsk(data.best_ask)
        setcbEthBid(data.best_bid)
      };
    }

  }, [currentCur])

  useEffect(() => {

    if (currentCur === 'eth') {
      ws.current = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@bookTicker");
      ws.current.onmessage = (e) => {
        let ethData = JSON.parse(e.data)
        let newbnEthAsk = bnEthAsk
        let newbnEthBid = bnEthBid
        if (newbnEthAsk !== ethData.a) {
          newbnEthAsk = ethData.a
        }
        if (newbnEthBid !== ethData.b) {
          newbnEthBid = ethData.b
        }
        setbnEthAsk(Math.round(newbnEthAsk * 100) / 100)
        setbnEthBid(Math.round(newbnEthBid * 100) / 100)
      }
    }
    if (currentCur === 'btc') {
      ws2.current = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@bookTicker")
      ws2.current.onmessage = (e) => {
        let btcData = JSON.parse(e.data)
        let newbnBtcAsk = bnBtcAsk
        let newbnBtcBid = bnBtcBid
        if (newbnBtcAsk !== btcData.a) {
          newbnBtcAsk = btcData.a
        }
        if (newbnBtcBid !== btcData.b) {
          newbnBtcBid = btcData.b
        }
        setbnBtcAsk(Math.round(newbnBtcAsk * 100) / 100)
        setbnBtcBid(Math.round(newbnBtcBid * 100) / 100)
      }
    }


  }, [currentCur])



  return (
    <div>
      <select onChange={(e) => setCurrentCur(e.target.value)}>
        <option value='' disabled selected>Choose a currency</option>
        <option value='btc'>Bitcoin</option>
        <option value='eth'>Etherum</option>
      </select>
      {currentCur !== '' && (
        <div>
          <table>
            <tr>
              <th></th>
              <th>Binance</th>
              <th>Coinbase</th>
            </tr>
            <tr>
              <td>Current Best Ask Price</td>
              <td>{currentCur === 'btc' ? bnBtcAsk : bnEthAsk}</td>
              <td>{currentCur === 'btc' ? cbBtcAsk : cbEthAsk}</td>
            </tr>
            <tr>
              <td>Current Best Bid Price</td>
              <td>{currentCur === 'btc' ? bnBtcBid : bnEthBid}</td>
              <td>{currentCur === 'btc' ? cbBtcBid : cbEthBid}</td>
            </tr>
          </table>
          {currentCur === 'btc' ? (
            <div>
              <p>Recommended to ask: {bnBtcAsk > cbBtcAsk ? 'Binance' : 'Coinbase'}</p>
              <p>Recommended to bid: {bnBtcBid > cbBtcBid ? 'Binance' : 'Coinbase'}</p>
            </div>
          ) : (
            <div>
              <p>Recommended to ask: {bnEthAsk > cbEthAsk ? 'Binance' : 'Coinbase'}</p>
              <p>Recommended to bid: {bnEthBid > cbEthBid ? 'Binance' : 'Coinbase'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Info;