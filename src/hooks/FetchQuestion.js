import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getServerData } from '../helpers/helper';

/** redux actions */
import * as Action from '../redux/question_reducer';

export const useFetchQuestion = (questionGroup) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ isLoading: false, apiData: [], serverError: null });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, isLoading: true }));
      try {
        const { questions, answers } = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/${questionGroup}`,
          (data) => data,
        );

        if (questions.length > 0) {
          setData({ isLoading: false, apiData: questions, serverError: null });

          /** dispatch an action */
          dispatch(Action.startQuizAction({ question: questions, answers }));
        } else {
          throw new Error('No Questions Available');
        }
      } catch (error) {
        console.log(error);
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };

    fetchData();
  }, [dispatch, questionGroup]);

  return [data, setData];
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
