import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WriterPage from '../components/writer/WriterPage';

const WriterRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/writer" element={<WriterPage />} />
    </Routes>
  );
};

export default WriterRoute;
