// Setings reducer

import { SET_STATE, SET_CONTROL, SET_SENSOR_SETTINGS } from './types.js';

const initialState = {
	led: false,
	fan: false,
	updateInterval: 0,
	temperature: {
		max: 0,
		min: 0
	},
	humidity: {
		max: 0,
		min: 0
	},
	co2: {
		max: 0,
		min: 0
	}
};

const settingsReducer = (state, action) => {
	let value;

	switch (action.type) {
		case SET_STATE:
			const newState = action.payload;
			return newState;

		case SET_CONTROL:
			return {
				...state,
				[action.payload.name]: action.payload.value
			};

		case SET_SENSOR_SETTINGS:
			value = Number(action.payload.value);
			// if (!value) return state;

			// value = action.payload.value;
			// if (!isDigit.test(value)) return state;

			const sensor = action.payload.sensor;
			const name = action.payload.name;

			if (sensor)
				return {
					...state,
					[sensor]: {
						...state[sensor],
						[name]: value
					}
				};
			else
				return {
					...state,
					[name]: value
				};

		default:
			return state;
	}
};

export { initialState, settingsReducer };
