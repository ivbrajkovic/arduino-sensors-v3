// Log object to console
export const logObj = object => console.log('TCL: object', JSON.stringify(object, null, 2));

// Check if object is empty
export const isEmptyObj = object => !Object.keys(object).length;

// Format local datetime
export const formatDatetime = date => {
	const d = date || new Date();
	return d.toLocaleTimeString('hr-HR', {
		year: 'numeric',
		// month: 'short',
		month: '2-digit',
		day: '2-digit',
		hour12: false,
		hour: '2-digit',
		minute: '2-digit'
	});
};

// Format local time
export const formatTime = date => {
	const times = [];
	date &&
		date.forEach(item =>
			times.push(
				new Date(item.seconds * 1000).toLocaleTimeString('hr-HR', {
					hour12: false,
					hour: '2-digit',
					minute: '2-digit'
				})
			)
		);
	return times;
};

// Random number from 0 to N
export const randomNum = N => Math.floor(Math.random() * N);

/**
 * Check if value is a digit
 */
export const isNumber = key => {
	return /[0-9]/.test(key);
};
