import { Helmet } from "react-helmet";
import './index.css'
import Info from "./components/info";

const App = () => {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Crypto Web</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Minh Le's website" />
      </Helmet>
      <Info />
    </div>
  );
}

export default App;
