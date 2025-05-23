import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormsPage from './Pages/FormsPage';
import NewForm from './Pages/NewForm';
import FormViewPage from './Pages/FormViewPage';
import ResponsesPage from './Pages/ResponsesPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allforms" element={<FormsPage />} />
        <Route path="/form/:id" element={<FormViewPage />} />
        <Route path="/newform" element={<NewForm />} />
        <Route path="/form/:id/responses" element={<ResponsesPage />} />
      </Routes>
    </Router>
  );
}

export default App;