import {Alert, Platform} from 'react-native';

const server =
  Platform.OS === 'ios'
    ? 'https://peths-back.herokuapp.com'
    : 'https://peths-back.herokuapp.com';

function showError(err) {
  if (err.response && err.response.data) {
    Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${err.response.data}`);
  } else {
    Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${err}`);
  }
}

function showSuccess(msg) {
  Alert.alert('Sucesso!', msg);
}

export {server, showError, showSuccess};

/*const server = axios.create({
  baseURL: 'https://peths-back.herokuapp.com',
});*/
