import { Helmet } from "react-helmet";
import Info from "./components/info";

const App = () => {
  // trades = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1DE@trades")
  // trades2 = new WebSocket("wss://stream.binance.com:9443/ws/etheeur@trade")
  
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Minh Le</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Minh Le's website" />
      </Helmet>
      <header className="App-header">
        {/* <Header /> */}
      </header>
      <Info />
    </div>
  );
}

export default App;
