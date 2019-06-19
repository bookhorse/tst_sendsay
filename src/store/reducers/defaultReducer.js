const initialstate = {
  messages: [
    { date: '123 июня', theme: 'asdasdsadas', status: -1 },
    { date: '99 апреля', theme: 'asdasdsadas', status: 2 },
    { date: '1 мая', theme: 'asdasdsadas', status: -3 },
    { date: 'asdsad', theme: 'asdasdsadas', status: -3 },
    { date: 'asdsad', theme: 'asdasdsadas', status: -3 },
  ],
  sendStatus: 0
};

const defaultReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "SET_TOKEN": return Object.assign({}, state, {
      token: action.code
    });
    default: return state;
  }
};


export default defaultReducer;
