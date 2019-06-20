import * as Types from './types'
import Sendsay from 'sendsay-api';
import { createCookie } from '../../utils'

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

export const sendMessage = ({
    theme,
    senderName,
    senderEmail,
    receiverName,
    receiverEmail,
    textarea
}) => {
  const req = {
    "action" : "issue.send.test",
    "letter" : {
      "subject" : theme,
      "from.name" : senderName,
      "from.email" : senderEmail,
      "to.name" : receiverName,
      "message": { text : textarea },
      "attaches": [ 
        //  {
        //  "name" : "имя файла",
        //  "content": "содержимое файла закодированное base64",
        //  "encoding" : "base64",
        // }
      ]
    },
    "sendwhen": "test",
    "mca": [
      receiverEmail
    ],
    "session": sendsay.session
  };
  return dispatch => {
    return ssSendMsg(req)
      .then( (id) => console.log(id, 'ok'))
      .catch( (err) => dispatch(showError(err)))
  }

}

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
