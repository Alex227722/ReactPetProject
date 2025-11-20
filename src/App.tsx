import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Modal from 'react-modal';
import Layout from './Layout';
import SectionWrite from './components/SectionWrite';
import SectionNext from './components/SectionNext';
import SectionDescription from './components/SectionDescription';
import SectionProfit from './components/SectionProfit';
import SectionCards from './components/SectionCards';
import SectionCharacteristics from './components/SectionCharacteristics';
import SectionDownload from './components/SectionDownload';
import AboutPage from './pages/AboutPage';
import ComparePage from './pages/ComparePage';
import LikePage from './pages/LikePage';
import Checkout from './pages/Checkout';
import { GlobalProvider } from './GlobalContext';
import './assets/css/reset.css';
import './assets/css/stylesheet.css';
import './App.css';

function App() {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <>
                  <SectionNext />
                  <SectionCards title="Наші шрифти" />
                  <SectionWrite />
                  <SectionDescription />
                  <SectionProfit />
                  <SectionCharacteristics />
                  <SectionDownload />
                </>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/like" element={<LikePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/checkout" element={<Checkout />} /> 
          </Route>
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;