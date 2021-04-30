import axios from 'axios';
import React, {useState} from 'react';
import {
  Platform,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {server, showError, showSuccess} from '../common';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';

import commonStyles from '../commonStyles';

export default ({route, navigation}) => {
  addPet = async pet => {
    try {
      await axios.post(`${server}/pets`, {
        avatarUrl: pet.avatarUrl
          ? pet.avatarUrl
          : 'https://image.freepik.com/vetores-gratis/desenho-fofo-de-gato-e-cachorro_138676-3018.jpg',
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

  editPet = async pet => {
    try {
      await axios.put(`${server}/pets/${pet.id}`, {
        avatarUrl: pet.avatarUrl
          ? pet.avatarUrl
          : 'https://image.freepik.com/vetores-gratis/desenho-fofo-de-gato-e-cachorro_138676-3018.jpg',
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

  const [pet, setPet] = useState(
    route.params
      ? {
          id: route.params.id,
          avatarUrl: route.params.avatarUrl,
          nome: route.params.nome,
          anoNascimento: new Date(route.params.anoNascimento),
          peso: route.params.peso,
          sexo: route.params.sexo,
          observações: route.params.observacoes,
          showDatePicker: false,
        }
      : {
          avatarUrl: '',
          nome: '',
          anoNascimento: new Date(),
          peso: '',
          sexo: '',
          observações: '',
          showDatePicker: false,
        },
  );

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={pet.anoNascimento}
        mode={'date'}
        onChange={(_, anoNascimento) =>
          setPet({...pet, anoNascimento, showDatePicker: false})
        }
      />
    );

    const dateString = moment(pet.anoNascimento).format('DD-MM-YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => setPet({...pet, showDatePicker: true})}>
            <Text>{dateString}</Text>
          </TouchableOpacity>
          {pet.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker;
  };

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
      {this.getDatePicker()}
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

      {pet.id && (
        <Button
          title="Editar"
          onPress={() => {
            this.editPet(pet);
            navigation.goBack();
          }}
        />
      )}

      {!pet.id && (
        <Button
          title="Adicionar"
          onPress={() => {
            this.addPet(pet);
            navigation.goBack();
          }}
        />
      )}
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
  datePicker: {
    width: 350,
  },
});
