import React, {Component} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import axios from 'axios';
import {server, showError, showSuccess} from '../common';

import {CheckBox} from 'react-native-elements';

import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';

const initialState = {
  nome: 'Testando',
  crmv: '',
  email: 'teste1@teste.com',
  senha: '1234567',
  confirmarSenha: '1234567',
  isVeterenarySelected: false,
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

      showSuccess('Usuário cadastrado!');
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
    const validations = [];

    validations.push(this.state.email && this.state.email.includes('@'));
    validations.push(this.state.senha && this.state.senha.length >= 6);

    if (this.state.stageNew) {
      validations.push(this.state.nome && this.state.nome.trim().length >= 2);
      validations.push(this.state.senha === this.state.confirmarSenha);
    }

    if (this.state.stageNew && this.state.isVeterenarySelected) {
      validations.push(this.state.crmv && this.state.crmv.trim().length >= 3);
    }

    const validForm = validations.reduce((t, a) => t && a);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Image
          style={styles.image}
          source={require('../../assets/image/catdog.png')}
        />
        <View style={styles.inputArea}>
          {this.state.stageNew && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                size={30}
                checkedColor={commonStyles.colors.white}
                uncheckedColor={commonStyles.colors.white}
                checked={this.state.isVeterenarySelected}
                onPress={() =>
                  this.setState({
                    isVeterenarySelected: !this.state.isVeterenarySelected,
                  })
                }
              />
              <Text style={styles.checkboxText}>Sou um veterinário</Text>
            </View>
          )}
          {this.state.stageNew && (
            <AuthInput
              icon="user"
              placeholder="Nome"
              value={this.state.nome}
              onChangeText={nome => this.setState({nome})}
            />
          )}

          {this.state.stageNew && this.state.isVeterenarySelected && (
            <AuthInput
              icon="vcard"
              placeholder="CRMV"
              value={this.state.crmv}
              onChangeText={crmv => this.setState({crmv})}
            />
          )}
          <AuthInput
            icon="at"
            placeholder="E-mail"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          <AuthInput
            icon="lock"
            placeholder="Senha"
            secureTextEntry={true}
            value={this.state.senha}
            onChangeText={senha => this.setState({senha})}
          />
          {this.state.stageNew && (
            <AuthInput
              icon="asterisk"
              placeholder="Confirmar senha"
              secureTextEntry={true}
              value={this.state.confirmarSenha}
              onChangeText={confirmarSenha => this.setState({confirmarSenha})}
            />
          )}

          <TouchableOpacity
            style={styles.customButton}
            onPress={this.signinOrSignup}
            disabled={!validForm}>
            <Text style={styles.customButtonText}>
              {this.state.stageNew ? 'Registrar' : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.setState({stageNew: !this.state.stageNew});
          }}>
          <Text style={styles.boldText}>
            {this.state.stageNew
              ? 'Já possui conta?'
              : 'Ainda não possui conta?'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonStyles.colors.primary,
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
