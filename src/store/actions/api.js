import * as Types from './types'
import { createCookie } from '../../utils'
import Sendsay from 'sendsay-api/dist/sendsay-api.cjs.js'; // FIXME lol

export const sendsay = new Sendsay();

const ssLogin = () => {
  sendsay.setSessionFromCookie();

    if (sendsay.session === undefined) {
      // FIXME hardcoded crap
      sendsay.login({
        login: 'x_1561021058215863',
        sublogin: 'mytest1',
        password: 'aYF>hI`ik}'
      }).then(() => {
        createCookie('sendsay_session', sendsay.session, 2)
        return Promise.resolve()
      })
    } else {
      console.log('session from cookie!')
      return Promise.resolve();
    }
    return Promise.reject();
}

export const ssSendMsg = async (req) => {
  if (sendsay.session) {
    const r = await sendsay.request(req);
    const track = r['track.id'];
    if (track) {
      return Promise.resolve(track)
    } else {
      return Promise.reject('Ошибка отправки сообщения')
    }
  } else return Promise.reject('Ошибка авторизации');
}

export const ssCheck = async (track) => {
  if (sendsay.session) {
    const req = {
      "action": "track.get",
      "id": track,
      "session": sendsay.session
    };
    const r = await sendsay.request(req);
    const status = r.obj.status;
    return Promise.resolve(status);
  } else return Promise.reject('Ошибка авторизации');
}

export const sendMessage = ({
    theme,
    senderName,
    senderEmail,
    receiverName,
    receiverEmail,
    textarea
}, files) => {

  const attaches = files.map(f => ({
    name: f.name,
    content: f.data,
    encoding: "base64"
  }))

  console.log(attaches)

  const req = {
    "action" : "issue.send.test",
    "letter" : {
      "subject" : theme,
      "from.name" : senderName,
      "from.email" : senderEmail,
      "to.name" : receiverName,
      "message": { text : textarea },
      "attaches": attaches, 
        //  "name" : "имя файла",
        //  "content": "содержимое файла закодированное base64",
        //  "encoding" : "base64",
    },
    "sendwhen": "test",
    "mca": [
      receiverEmail
    ],
    "session": sendsay.session
  };
  return dispatch => {
    dispatch(setSendStatus(1, receiverEmail))
    return ssSendMsg(req)
      .then( (id) => {
        dispatch(addMessage2List(id, theme));
        dispatch(startCheckMessages());
      })
      .catch( (err) => { 
        console.log(err);
        dispatch(setSendStatus(0, receiverEmail))
        dispatch(showError(err.id + ' ' + err.explain))
        return dispatch(addMessage2List(undefined, theme, err));
      })
  }
}


export const addMessage2List = (track, text, err) => {
  const sts = !err ? 0 : -123;

  return {
    type: Types.ADDMESSAGE,
    payload: {
      track,
      text,
      date: new Date().toLocaleDateString("ru-RU"),
      error: err,
      status: sts
    }
  }
}

export const changeMessage = (msg, status) => {
  return {
    type: Types.CHGMESSAGE,
    payload: {
      msg,
      status
    }
  }
}


const checkMsg = (msg) => {
  return dispatch => {
    ssCheck(msg.track)
      .then((newstatus) => {
        if (Number(newstatus) !== Number(msg.status)) {
          dispatch(changeMessage(msg, Number(newstatus)));
          dispatch(setSendStatus(0))
        } else {
          console.log('still sending')
          dispatch(startCheckMessages())
        }
      })
      .catch((err) => dispatch(showError(err)))
  }
}

const chkInterval = 2500;
export const checkMessages = ( dispatch, getState ) => {
  const state = getState();
  const msgs = state.default.messages.filter((x) => x.status > -1 && x.track);
  if (msgs.length) {
    dispatch(checkMsg(msgs[0]));
  }
}

export const startCheckMessages = () => {
  return (dispatch, getState) => {
    return setTimeout(() => checkMessages(dispatch, getState), chkInterval);
  }
}

export const setSendStatus = (status, sendTo) => ({
  type: Types.SETSENDSTATUS,
  payload: {
    status,
    sendTo: sendTo ? sendTo : ""
  }
})

export const showError = (err) => ({
  type: Types.ERROR,
  payload: {
    error: err
  }
})

export const setLoginStatus = (status) => ({
  type: Types.LOGIN,
  payload: {
    status
  }
})

export const sendSayAuth = () => {
  return dispatch => {
    return ssLogin()
      .then( () => dispatch(setLoginStatus(1)))
      .catch( () => dispatch(setLoginStatus(-1)))
  }
}
