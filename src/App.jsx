import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Footer from "./components/Footer/Footer";
import FormPage from "./pages/FormPage";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/results' element={<ResultsPage />} />
            <Route path='/form' element={<FormPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
