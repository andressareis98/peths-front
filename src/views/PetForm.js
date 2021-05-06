import axios from 'axios';
import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';

import {Avatar} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import {server, showError, showSuccess} from '../common';
import commonStyles from '../commonStyles';
import FormPetInput from '../components/FormPetInput';

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
      ? {...route.params, anoNascimento: new Date(route.params.anoNascimento)}
      : {
          avatarUrl:
            'https://image.freepik.com/vetores-gratis/desenho-fofo-de-gato-e-cachorro_138676-3018.jpg',
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

    const dateString = moment(pet.anoNascimento).format('DD/MM/YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => setPet({...pet, showDatePicker: true})}>
            <View style={styles.containerDatePicker}>
              <Icon style={styles.icon} size={20} name="birthday-cake" />
              <Text style={styles.textDatePicker}>{dateString}</Text>
            </View>
          </TouchableOpacity>
          {pet.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.formContainer}>
        <View style={styles.avatar}>
          <Avatar rounded size="large" source={{uri: pet.avatarUrl}} />
        </View>
        <View>
          <FormPetInput
            icon="photo"
            onChangeText={avatarUrl => setPet({...pet, avatarUrl})}
            placeholder="Informe o avatar Url"
            value={pet.avatarUrl}
          />

          <FormPetInput
            icon="paw"
            onChangeText={nome => setPet({...pet, nome})}
            placeholder="Informe o nome do pet"
            value={pet.nome}
          />

          {this.getDatePicker()}

          <FormPetInput
            icon="weight"
            onChangeText={peso => setPet({...pet, peso})}
            placeholder="Informe o peso"
            value={pet.peso}
          />

          <FormPetInput
            icon="venus-mars"
            onChangeText={sexo => setPet({...pet, sexo})}
            placeholder="Informe o sexo"
            value={pet.sexo}
          />

          <FormPetInput
            icon="plus"
            onChangeText={observacoes => setPet({...pet, observacoes})}
            placeholder="Alergias / informações relevantes"
            value={pet.observacoes}
          />

          {pet.id && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.editPet(pet);
                navigation.goBack();
              }}>
              <Text style={styles.customButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          )}

          {!pet.id && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addPet(pet);
                navigation.goBack();
              }}>
              <Text style={styles.customButtonText}>Adicionar Pet</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: commonStyles.colors.primary,
  },
  formContainer: {
    backgroundColor: commonStyles.colors.tertiary,
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    alignItems: 'center',
  },
  avatar: {
    marginTop: -50,
  },
  containerDatePicker: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 45,
    backgroundColor: '#fbfbfb',
    borderRadius: 5,
    marginTop: 15,
  },
  icon: {
    color: commonStyles.colors.secundary,
  },
  textDatePicker: {
    flex: 1,
    fontSize: 15,
    color: commonStyles.colors.secundary,
    marginLeft: 10,
  },
  button: {
    height: 45,
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: commonStyles.colors.secundary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButtonText: {
    fontSize: 15,
    color: commonStyles.colors.white,
  },
});
