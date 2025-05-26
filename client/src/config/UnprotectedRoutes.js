import HomePage from '../Pages/HomePage';
import FormViewPage from '../Pages/FormViewPage';
import AboutPage from '../Pages/AboutPage';

export const unprotectedRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/form/:id',
    element: <FormViewPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
];