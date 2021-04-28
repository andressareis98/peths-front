import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Textarea,
  Button,
  Alert,
} from 'react-native';
import {server, showError, showSuccess} from '../common';

import commonStyles from '../commonStyles';

export default ({route, navigation}) => {
  addPet = async pet => {
    try {
      await axios.post(`${server}/pets`, {
        avatarUrl: pet.avatarUrl ? pet.avatarUrl : '',
        nome: pet.nome,
        anoNascimento: pet.anoNascimento,
        peso: pet.peso,
        sexo: pet.sexo,
        observacoes: pet.observacoes ? pet.observacoes : '',
      });
    } catch (e) {
      showError(e);
    }
  };

  const [pet, setPet] = useState(route.params ? route.params : {});
  return (
    <View style={styles.form}>
      <Text>Avatar Url: </Text>
      <TextInput
        style={styles.input}
        onChangeText={avatarUrl => setPet({...pet, avatarUrl})}
        placeholder="Informe o avatar Url"
        value={pet.avatarUrl}
      />
      <Text>Nome: </Text>
      <TextInput
        style={styles.input}
        onChangeText={nome => setPet({...pet, nome})}
        placeholder="Informe o nome"
        value={pet.nome}
      />
      <Text>Ano Nascimento: </Text>
      <TextInput
        style={styles.input}
        onChangeText={anoNascimento => setPet({...pet, anoNascimento})}
        placeholder="Informe o ano de nascimento"
        value={pet.anoNascimento}
      />
      <Text>Peso: </Text>
      <TextInput
        style={styles.input}
        onChangeText={peso => setPet({...pet, peso})}
        placeholder="Informe o peso"
        value={pet.peso}
      />
      <Text>Sexo: </Text>
      <TextInput
        style={styles.input}
        onChangeText={sexo => setPet({...pet, sexo})}
        placeholder="Informe o sexo"
        value={pet.sexo}
      />
      <Text>Observações: </Text>
      <TextInput
        style={styles.input}
        onChangeText={observacoes => setPet({...pet, observacoes})}
        placeholder="Informe alergias ou informações relevantes sobre o pet"
        value={pet.observacoes}
      />
      <Button
        title="Salvar"
        onPress={() => {
          this.addPet(pet);
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: commonStyles.colors.primary,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
});
