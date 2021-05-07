import axios from 'axios';
import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Avatar} from 'react-native-elements';
import {CheckBox} from 'react-native-elements';
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
          sexo: 'Fêmea',
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
            keyboardType="decimal-pad"
            onChangeText={peso => setPet({...pet, peso})}
            placeholder="Informe o peso"
            value={pet.peso}
          />

          <View style={styles.containerCheckboxAndTitle}>
            <View style={styles.containerCheckboxText}>
              <Icon name="venus-mars" size={20} style={styles.icon} />
              <Text style={styles.titleCheckbox}>Sexo: </Text>
            </View>
            <View style={styles.containerCheckbox}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setPet({...pet, sexo: 'Fêmea'})}>
                <CheckBox
                  center
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={pet.sexo === 'Fêmea'}
                  checkedColor={commonStyles.colors.secundary}
                  onPress={() => setPet({...pet, sexo: 'Fêmea'})}
                />
                <Text style={styles.legendCheckbox}>Fêmea</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setPet({...pet, sexo: 'Macho'})}>
                <CheckBox
                  center
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={pet.sexo === 'Macho'}
                  checkedColor={commonStyles.colors.secundary}
                  onPress={() => setPet({...pet, sexo: 'Macho'})}
                />
                <Text style={styles.legendCheckbox}>Macho</Text>
              </TouchableOpacity>
            </View>
          </View>

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
  containerCheckboxAndTitle: {
    backgroundColor: '#fbfbfb',
    padding: 15,
    marginTop: 15,
    borderRadius: 5,
  },
  containerCheckboxText: {
    flexDirection: 'row',
  },
  containerCheckbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  titleCheckbox: {
    color: commonStyles.colors.secundary,
    fontWeight: 'bold',
  },
  icon: {
    color: commonStyles.colors.secundary,
    marginRight: 15,
  },
  legendCheckbox: {
    color: commonStyles.colors.grayDark,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
