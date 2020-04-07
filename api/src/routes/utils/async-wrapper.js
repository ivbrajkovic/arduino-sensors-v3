/**
 * Handle thrown from async function
 * @param {function} fn Async function to handle client request
 * @returns {function} Express route handler
 */
module.exports = fn => async (req, res, next) => {
  try {
    const { status, data } = await fn(req);

    // Send success status
    res.status(status).json({ success: true, data: data });
  } catch (error) {
    // Call default error handler
    next(error);
  }
};
