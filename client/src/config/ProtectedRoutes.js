import NewForm from '../Pages/NewForm';
import FormsPage from '../Pages/FormsPage';
import ResponsesPage from '../Pages/ResponsesPage';

export const protectedRoutes = [
  {
    path: '/newform',
    element: <NewForm />,
  },
  {
    path: '/allforms',
    element: <FormsPage />,
  },
  {
    path: '/form/:id/responses',
    element: <ResponsesPage />,
  },
];