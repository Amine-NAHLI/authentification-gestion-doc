import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Verify from './pages/Verify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/verify/:documentId" element={<Verify />} />
        <Route path="*" element={<Navigate to="/verify/test-document" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
