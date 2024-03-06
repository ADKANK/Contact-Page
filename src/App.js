import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactPage from './pages/ContactPage';;



function App() {
  return (
    <div className="app">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
