import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import commonStyles from '../commonStyles';

export default ({navigation, route}) => {
  usuario = route.params;

  const [pet, setPet] = useState({petId: ''});

  return (
    <SafeAreaView style={styles.container}>
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
