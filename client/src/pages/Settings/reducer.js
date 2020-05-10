/**
 * Setings reducer
 */

// Helper fnc
import { trimLeadingZeros } from '../../helper';

export const initialState = {
  buttonDisabled: true,
  arduinos: [
    {
      arduino: 0,
      led: 0,
      fan: 0,
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
    }
  ]
};

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return { ...state, arduinos: action.payload };

    case 'SET_CONTROL': {
      const tmp = { ...state };
      const { selected, name, value } = action.payload;
      tmp.arduinos[selected][name] = value;

      return tmp;
    }

    case 'SET_VALUE': {
      const tmp = { ...state };
      let { selected, name, value } = action.payload;

      // If no value provided set to "0"
      if (value === '') value = 0;
      // Remove leading zeroes
      // else if (value > 1) value = trimLeadingZeros(value);
      else value = trimLeadingZeros(value);

      if (name.indexOf('-') > 1) {
        name = name.split('-');
        tmp.arduinos[selected][name[0]][name[1]] = value;
      } else tmp.arduinos[selected][name] = value;

      tmp.buttonDisabled = false;
      return tmp;
    }

    case 'DISABLE_BUTTON':
      return { ...state, buttonDisabled: true };

    default:
      return state;
  }
};
