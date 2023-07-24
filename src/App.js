import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/** import componets **/
import Main from './pages/Main';
import Quiz, { loader as loaderQuiz } from './pages/Quiz';
import PathNotFound from './pages/PathNotFound';
import { CheckUserExist } from './helpers/helper';
import QuizHome from './pages/QuizHome';
import ResultOverview from './pages/ResultOverview';
import AnswersReview from './pages/AnswersReview';

/** react routes **/

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/quiz/home',
    element: (
      <CheckUserExist>
        <QuizHome />
      </CheckUserExist>
    ),
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
        <ResultOverview />
      </CheckUserExist>
    ),
  },
  {
    path: '/result/review/:userid',
    element: (
      <CheckUserExist>
        <AnswersReview />
      </CheckUserExist>
    ),
  },
  {
    path: '*',
    element: <PathNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
