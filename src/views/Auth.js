import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {CheckBox} from 'react-native-elements';

import Services from '../services/Services';

import {server, showError, showSuccess} from '../common';
import axios from 'axios';

import AuthInput from '../components/AuthInput';
import commonStyles from '../commonStyles';

export default () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    nome: '',
    crmv: '',
    email: 'andressareis98@outlook.com',
    senha: 'teste123',
    confirmarSenha: '',
    isVeterenarySelected: false,
    stageNew: false,
  });

  const validations = [];

  const signinOrSignup = () => {
    if (user.stageNew) {
      signup();
    } else {
      signin();
    }
  };

  const signup = async () => {
    try {
      await Services.signUp(user.nome, user.crmv, user.email, user.senha);
      showSuccess('Usuário cadastrado!');
    } catch (e) {
      showError(e);
    }
  };

  const signin = async () => {
    try {
      const res = await Services.signIn(user.email, user.senha);

      axios.defaults.headers.common[
        'Authorization'
      ] = `bearer ${res.data.token}`;

      navigation.navigate('Home', {
        screen: 'Home',
        params: {
          screen: 'Home',
          params: {...res.data},
        },
      });
    } catch (e) {
      showError(e);
    }
  };

  const alterView = () => {
    if (user.stageNew) {
      setUser({...user, stageNew: false});
    } else {
      setUser({...user, stageNew: true});
    }
  };

  const alterProfileUser = () => {
    if (user.isVeterenarySelected) {
      setUser({...user, isVeterenarySelected: false});
    } else {
      setUser({...user, isVeterenarySelected: true});
    }
  };

  validations.push(user.email && user.email.includes('@'));
  validations.push(user.senha && user.senha.length >= 6);

  if (user.stageNew) {
    validations.push(user.nome && user.nome.trim().length >= 2);
    validations.push(user.senha === user.confirmarSenha);
  }

  if (user.stageNew && user.isVeterenarySelected) {
    validations.push(user.crmv && user.crmv.trim().length >= 3);
  }

  const validForm = validations.reduce((t, a) => t && a);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: 'padding',
        android: null,
      })}
      style={styles.container}>
      <StatusBar />
      <Image
        style={styles.image}
        source={require('../../assets/image/catdog.png')}
      />

      <Text style={styles.title}>peths</Text>

      <View style={styles.inputArea}>
        {user.stageNew && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              size={30}
              checkedColor={commonStyles.colors.white}
              uncheckedColor={commonStyles.colors.white}
              checked={user.isVeterenarySelected}
              onPress={() => alterProfileUser()}
            />
            <Text style={styles.checkboxText}>Sou um veterinário</Text>
          </View>
        )}

        {user.stageNew && user.isVeterenarySelected && (
          <AuthInput
            icon="vcard"
            placeholder="CRMV"
            value={user.crmv}
            onChangeText={crmv => setUser({...user, crmv: crmv})}
            returnKeyType="next"
          />
        )}

        {user.stageNew && (
          <AuthInput
            icon="user"
            placeholder="Nome"
            value={user.nome}
            onChangeText={nome => setUser({...user, nome: nome})}
            returnKeyType="next"
          />
        )}

        <AuthInput
          icon="at"
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={user.email}
          onChangeText={email => setUser({...user, email: email})}
          returnKeyType="next"
        />

        <AuthInput
          icon="lock"
          placeholder="Senha"
          secureTextEntry={true}
          value={user.senha}
          onChangeText={senha => setUser({...user, senha: senha})}
        />

        {user.stageNew && (
          <AuthInput
            icon="asterisk"
            placeholder="Confirmar Senha"
            secureTextEntry={true}
            value={user.confirmarSenha}
            onChangeText={confirmarSenha =>
              setUser({...user, confirmarSenha: confirmarSenha})
            }
          />
        )}

        <TouchableOpacity
          style={[
            validForm ? styles.customButton : styles.disabledCustomButton,
          ]}
          onPress={signinOrSignup}
          disabled={!validForm}>
          <Text style={styles.customButtonText}>
            {user.stageNew ? 'Registrar' : 'Entrar'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => alterView()}>
        <Text style={styles.boldText}>
          {user.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonStyles.colors.primary,
  },
  title: {
    fontSize: 100,
    color: commonStyles.colors.white,
  },
  inputArea: {
    padding: 10,
    width: '100%',
  },
  customButton: {
    height: 50,
    backgroundColor: commonStyles.colors.secundary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledCustomButton: {
    height: 50,
    backgroundColor: commonStyles.colors.secundary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  customButtonText: {
    fontSize: commonStyles.sizes.buttonText,
    color: commonStyles.colors.white,
    padding: 1,
  },
  boldText: {
    fontSize: 15,
    color: commonStyles.colors.secundary,
    fontWeight: 'bold',
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxText: {
    color: commonStyles.colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
