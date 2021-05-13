import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import commonStyles from '../commonStyles';

export default ({usuario, navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Ola</Text>
      <StatusBar />
      <Text>Seja bem vindo(a)</Text>

      <View>
        <View>
          <Text>Nome: {usuario.nome}</Text>
          <Text>CRMV: {usuario.crmv}</Text>
          <Text>E-mail: {usuario.email}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('QrCodeScanner', usuario)}>
        <Text style={styles.textButton}>Ler qr Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerViewQrCode: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: commonStyles.colors.primary,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: commonStyles.colors.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
  },
  textButton: {
    color: commonStyles.colors.white,
    fontSize: 15,
  },
});
