import * as Types from '../actions/types';
import {updateObjectInArray} from '../../utils';

const initialstate = {
  messages: [],
  messagestest: [
    { date: '123 июня', theme: 'asdasdsadas', status: -1 },
    { date: '99 апреля', theme: 'asdasdsadas', status: 2 },
    { date: '1 мая', theme: 'asdasdsadas', status: -3 },
    { date: 'asdsad', theme: 'asdasds3333333333333sssssssssssssssssssss33333333333333333adas', status: -3 },
  ],
  sendStatus: 0,
  sendTo: "",
  loginStatus: 0
};

const defaultReducer = (state = initialstate, action) => {
  switch (action.type) {
    case Types.LOGIN: return Object.assign({}, state, {
      loginStatus: action.payload.status
    });
    case Types.SETSENDSTATUS: return Object.assign({}, state, {
      sendStatus: action.payload.status,
      sendTo: action.payload.sendTo
    });
    case Types.ADDMESSAGE: {
      const newstate = Object.assign({}, state, {
        messages: [{ 
          date: action.payload.date,
          track: action.payload.track,
          theme: action.payload.text,
          status: action.payload.status
        }, ...state.messages]
      });
      return newstate;
    }
    case Types.CHGMESSAGE: {
      const index = state.messages.indexOf(action.payload.msg)
      if (index === -1) return state;
      const newmsg = Object.assign({}, action.payload.msg, { status: action.payload.status });
      const newstate = Object.assign({}, state, {
        messages: updateObjectInArray(state.messages, { index, item: newmsg })
      });
      return newstate;
    }
    default: return state;
  }
};


export default defaultReducer;
