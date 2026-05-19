import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Verify from './pages/Verify';

const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/verify/:documentId" element={<Verify />} />
        <Route path="*" element={<Navigate to="/verify/test-document" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
