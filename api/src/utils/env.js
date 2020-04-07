/**
 * Return process env value or default
 * @param {*} value Env value
 * @param {*} defaultValue Default value
 */
module.exports = (value, defaultValue) => process.env[value] || defaultValue;
