/**
 * Helpper for parsing and fromating error object
 */

// Redux
import { useSelector } from 'react-redux';

/**
 * Custom UI error selector with equality fnc
 * @returns Redux selector
 */
export const useErrorSelector = () =>
  useSelector(
    store => store.ui.error,
    (left, right) =>
      /^jwt_/.test(left.code) ||
      (left.code === right.code &&
        left.details?.length === right.details?.length)
  );

/**
 * Parse and format error object recived from API
 * @param {object} error Error object received from API
 * @returns Formated error object
 */
export const formatErrors = error => {
  if (!error) return {};

  if (error.details?.length)
    return Object.assign(
      {},
      ...error?.details?.map(el => ({ [el.param]: el.msg }))
    );
  else return { other: error.message };
};
