import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

import axios from 'axios';
import {server, showError, showSuccess} from '../common';
import {useNavigation} from '@react-navigation/native';

import {CheckBox} from 'react-native-elements';

import commonStyles from '../commonStyles';
import backgroudImage from '../../assets/image/friends.jpg';
import AuthInput from '../components/AuthInput';

const initialState = {
  nome: 'Teste',
  crmv: '',
  email: 'teste@teste.com',
  senha: '1234',
  confirmarSenha: '1234',
  isSelected: false,
  stageNew: false,
};

export default class Auth extends Component {
  state = {
    ...initialState,
  };

  signinOrSignup = () => {
    if (this.state.stageNew) {
      this.signup();
    } else {
      this.signin();
    }
  };

  signup = async () => {
    try {
      await axios.post(`${server}/signup`, {
        nome: this.state.nome,
        crmv: this.state.crmv,
        email: this.state.email,
        senha: this.state.senha,
      });

      showSuccess('Usuário cadastro!');
      this.setState({...initialState});
    } catch (e) {
      showError(e);
    }
  };

  signin = async () => {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: this.state.email,
        senha: this.state.senha,
      });

      axios.defaults.headers.common[
        'Authorization'
      ] = `bearer ${res.data.token}`;
      this.props.navigation.navigate('PetList');
    } catch (e) {
      showError(e);
    }
  };

  render() {
    return (
      <ImageBackground style={styles.background} source={backgroudImage}>
        <SafeAreaView style={styles.container}>
          <StatusBar />

          <Text style={styles.title}>Peths</Text>
          <View style={styles.formContainer}>
            <Text style={styles.subtitle}>
              {this.state.stageNew ? 'Cadastrar' : 'Entrar'}
            </Text>

            {this.state.stageNew && (
              <AuthInput
                icon="user"
                placeholder="Nome"
                value={this.state.nome}
                style={styles.input}
                onChangeText={nome => this.setState({nome})}
              />
            )}

            {this.state.stageNew && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  checked={this.state.isSelected}
                  onPress={() =>
                    this.setState({isSelected: !this.state.isSelected})
                  }
                />
                <Text style={styles.label}>Sou um veterinário</Text>
              </View>
            )}

            {this.state.stageNew && this.state.isSelected && (
              <AuthInput
                icon="vcard"
                placeholder="CRMV"
                value={this.state.crmv}
                style={styles.input}
                onChangeText={crmv => this.setState({crmv})}
              />
            )}
            <AuthInput
              icon="at"
              placeholder="E-mail"
              value={this.state.email}
              style={styles.input}
              onChangeText={email => this.setState({email})}
            />
            <AuthInput
              icon="lock"
              placeholder="Senha"
              secureTextEntry={true}
              value={this.state.senha}
              style={styles.input}
              onChangeText={senha => this.setState({senha})}
            />
            {this.state.stageNew && (
              <AuthInput
                icon="asterisk"
                placeholder="Confirmar senha"
                secureTextEntry={true}
                value={this.state.confirmarSenha}
                style={styles.input}
                onChangeText={confirmarSenha => this.setState({confirmarSenha})}
              />
            )}
            <TouchableOpacity onPress={this.signinOrSignup}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {this.state.stageNew ? 'Registrar' : 'Entrar'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => {
              this.setState({stageNew: !this.state.stageNew});
            }}>
            <Text style={styles.buttonText}>
              {this.state.stageNew
                ? 'Já póssui conta?'
                : 'Ainda não possui conta?'}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.primary,
    fontSize: 70,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: commonStyles.colors.white,
  },
  button: {
    backgroundColor: commonStyles.colors.primary,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.white,
    fontSize: 20,
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: commonStyles.colors.white,
  },
});
