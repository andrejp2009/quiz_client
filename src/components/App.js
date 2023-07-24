import '../styles/App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** import componets **/
import Main from './Main';
import Quiz, { loader as loaderQuiz } from './Quiz';
import Result from './Result';
import PathNotFound from './PathNotFound';
import { CheckUserExist } from '../helpers/helper';

/** react routes **/

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/quiz/:questionGroup',
    element: (
      <CheckUserExist>
        <Quiz />
      </CheckUserExist>
    ),
    loader: loaderQuiz,
  },
  {
    path: '/result/:userid',
    element: (
      <CheckUserExist>
        <Result />
      </CheckUserExist>
    ),
  },
  {
    path: '*',
    element: <PathNotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
