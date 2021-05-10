import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';

import QrCodeScanner from 'react-native-qrcode-scanner';

import commonStyles from '../commonStyles';

export default ({navigation, route}) => {
  const usuario = route.params;

  const [pet, setPet] = useState({petId: ''});

  ifScaned = e => {
    navigation.navigate('PetProfile', {
      petId: e.data,
      usuario: usuario,
    });
  };

  return (
    <QrCodeScanner
      containerStyle={{backgroundColor: '#FFF'}}
      onRead={this.ifScaned}
      reactivate={true}
      permissionDialogMessage="Necessário permitir acesso à câmera"
      reactivateTimeout={10}
      showMarker={true}
      markerStyle={{borderColor: '#FFF', borderRadius: 10}}
      bottomContent={
        <TouchableOpacity>
          <Text>Scan QR Code</Text>
        </TouchableOpacity>
      }
    />
    /* <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text>Informe o Id do pet: </Text>
      <TextInput
        style={styles.input}
        value={pet.petId}
        onChangeText={petId => setPet({petId: petId})}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('PetProfile', {
            petId: pet.petId,
            usuario: this.usuario,
          })
        }>
        <Text style={styles.textButton}>Iniciar atendimento</Text>
      </TouchableOpacity>
    </SafeAreaView> */
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
