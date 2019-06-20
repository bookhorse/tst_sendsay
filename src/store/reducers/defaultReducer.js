import * as Types from '../actions/types';

const initialstate = {
  messages: [
    { date: '123 июня', theme: 'asdasdsadas', status: -1 },
    { date: '99 апреля', theme: 'asdasdsadas', status: 2 },
    { date: '1 мая', theme: 'asdasdsadas', status: -3 },
    { date: 'asdsad', theme: 'asdasdsadas', status: -3 },
    { date: 'asdsad', theme: 'asdasds3333333333333sssssssssssssssssssss33333333333333333adas', status: -3 },
  ],
  sendStatus: 0,
  loginStatus: 0
};

const defaultReducer = (state = initialstate, action) => {
  switch (action.type) {
    case Types.LOGIN: return Object.assign({}, state, {
      loginStatus: action.payload.status
    });
    default: return state;
  }
};


export default defaultReducer;
