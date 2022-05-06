import Footer from "./components/Footer";
import Header from "./components/Header";
import Ledger from "./components/Ledger";

const App = () => (
  <div className="flex flex-col min-h-screen antialiased tracking-tighter text-gray-700">
    <Header />

    <Ledger />

    <Footer />
  </div>
);

export default App;
