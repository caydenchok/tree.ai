import { createBrowserRouter } from 'react-router-dom';
import TreeChat from '../pages/TreeChat';
import WriterPage from '../components/writer/WriterPage';

export const router = createBrowserRouter([
  {
    path: '/tree-chat',
    element: <TreeChat />,
  },
  {
    path: '/writer',
    element: <WriterPage />,
  },
  // Add other routes here
]);
