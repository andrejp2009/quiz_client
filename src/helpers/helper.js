import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

/** check user auth  */
export function CheckUserExist({ children }) {
  const auth = useSelector((state) => state.result.userId);
  return auth ? children : <Navigate to={'/'} replace={true}></Navigate>;
}

export function getRightAnswersCount(result, answers) {
  return result
    .map((element, i) => {
      return element === answers[i] ? 1 : 0;
    })
    .reduce((prev, curr) => prev + curr, 0);
}

export function combineResultAndAnswers(result, answers) {
  return result.map((element, i) => ({
    result: element,
    answer: answers[i],
  }));
}

/** get server data */
export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data;
  return callback ? callback(data) : data;
}

/** post server data */
export async function postServerData(url, result, callback) {
  const data = await (await axios.post(url, result))?.data;
  return callback ? callback(data) : data;
}
