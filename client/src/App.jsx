import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormsPage from './Pages/FormsPage';
import NewForm from './Pages/NewForm';
import FormViewPage from './Pages/FormViewPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FormsPage />} />
        <Route path="/form/:id" element={<FormViewPage />} />
        <Route path="/newform" element={<NewForm />} />
      </Routes>
    </Router>
  );
}

export default App;