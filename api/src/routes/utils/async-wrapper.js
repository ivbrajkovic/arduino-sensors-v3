/**
 * Handle thrown from async function
 * @param {function} fn Async function to handle client request
 * @returns {function} Express route handler
 */
module.exports = fn => async (req, res, next) => {
  try {
    // Await for data
    const data = await fn(req, res, next);

    if (data)
      // Send success status
      res.status(200).json({ status: 'ok', ...data });
    else next();
  } catch (error) {
    // Call default error handler
    next(error);
  }
};
