import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getServerData } from '../helpers/helper';

/** redux actions */
import * as Action from '../redux/question_reducer';

export const useFetchQuestion = (questionGroup) => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    /** async function fetch backend data */
    (async () => {
      try {
        const { questions, answers } = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/${questionGroup}`,
          (data) => data,
        );

        if (questions.length > 0) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: questions }));

          /** dispatch an action */
          dispatch(Action.startQuizAction({ question: questions, answers }));
        } else {
          throw new Error('No Question Avalibale');
        }
      } catch (error) {
        console.log(error);
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch, questionGroup]);

  return [getData, setGetData];
};

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};
export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};

export const useFetchQuestionsForResult = (questionGroup) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    /** async function fetch backend data */
    (async () => {
      try {
        const fetchedData = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/${questionGroup}`,
          (data) => data,
        );

        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        // Handle the error if needed
      }
    })();
  }, [questionGroup]);

  return { data, isLoading };
};

export const getFetchQuestionsResByGroup = async (questionGroup) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/${questionGroup}`,
  );
  return await res.json();
};
