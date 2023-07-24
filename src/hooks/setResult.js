import { useEffect, useState } from 'react';
import { postServerData, getServerData } from '../helpers/helper';
import * as Action from '../redux/result_reducer';

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};

export const UpdateResult = (index, checked) => async (dispatch) => {
  try {
    await dispatch(Action.updateResultAction({ index, checked }));
  } catch (error) {
    console.log(error);
  }
};

/** insert user data */
export const usePublishResult = (resultData, onComplete) => {
  const { result, username } = resultData;

  (async () => {
    try {
      if (result !== [] && !username) throw new Error("Couldn't get Result");

      await postServerData(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
        resultData,
        (data) => data,
      );

      // If the API request is successful, call the onComplete callback
      if (onComplete && typeof onComplete === 'function') {
        onComplete();
      }
    } catch (error) {
      console.log(error);
    }
  })();
};

export const useFetchResult = (userId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    /** async function fetch backend data */
    (async () => {
      try {
        const fetchedData = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result/${userId}`,
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
  }, [userId]);

  return { data, isLoading };
};

export const getFetchResultByUserID = async (userId) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result/${userId}`);
  return await res.json();
};
