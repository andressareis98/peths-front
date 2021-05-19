import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import {CheckBox} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import {showError} from '../common';
import commonStyles from '../commonStyles';
import FormPetInput from '../components/FormPetInput';
import Services from '../services/Services';
import {ScrollView} from 'react-native-gesture-handler';

export default ({route, navigation}) => {
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

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setPet({...pet, avatarUrl: `data:image/jpeg;base64,${response.base64}`});
    });
  };

  const addPet = async pet => {
    try {
      await Services.newPet(
        pet.avatarUrl,
        pet.nome,
        pet.anoNascimento,
        pet.peso,
        pet.sexo,
        pet.observacoes,
      );
    } catch (e) {
      showError(e);
    }
  };

  const editPet = async pet => {
    try {
      await Services.editPet(
        pet.id,
        pet.avatarUrl,
        pet.nome,
        pet.anoNascimento,
        pet.peso,
        pet.sexo,
        pet.observacoes,
      );
    } catch (e) {
      showError(e);
    }
  };

  const getDatePicker = () => {
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
      <View style={styles.formContainer}>
        <View style={styles.containerAvatar}>
          <TouchableOpacity onPress={() => chooseFile('photo')}>
            <Image source={{uri: pet.avatarUrl}} style={styles.avatar} />

            <Text style={styles.textAlterPhoto}>ALTERAR FOTO</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FormPetInput
            icon="paw"
            onChangeText={nome => setPet({...pet, nome})}
            placeholder="Informe o nome do pet"
            value={pet.nome}
          />

          {getDatePicker()}

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
                editPet(pet);
                navigation.goBack();
              }}>
              <Text style={styles.customButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          )}

          {!pet.id && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                addPet(pet);
                navigation.goBack();
              }}>
              <Text style={styles.customButtonText}>Adicionar o Pet</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.primary,
  },
  formContainer: {
    backgroundColor: commonStyles.colors.tertiary,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginHorizontal: 15,
    marginTop: 40,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  containerAvatar: {
    marginTop: -50,
    alignItems: 'center',
  },
  textAlterPhoto: {
    marginTop: 15,
    fontSize: 15,
    color: commonStyles.colors.secundary,
    fontWeight: 'bold',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  containerDatePicker: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 45,
    backgroundColor: '#fbfbfb',
    borderRadius: 50,
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
    borderRadius: 50,
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
    borderRadius: 10,
  },
  containerCheckboxText: {
    flexDirection: 'row',
  },
  containerCheckbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
