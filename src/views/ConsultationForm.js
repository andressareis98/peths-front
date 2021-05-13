import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Services from '../services/Services';
import {server, showError, showSuccess} from '../common';
import PetDetails from '../components/PetDetails';
import commonStyles from '../commonStyles';

export default ({route, navigation}) => {
  const [consultation, setConsultation] = useState({
    data: new Date(),
    peso: '',
    diagnostico: '',
    prescricao: '',
    showDatePicker: false,
  });

  pet = route.params;

  const addConsult = async consultation => {
    try {
      await Services.newConsult(
        consultation.data,
        consultation.peso,
        consultation.diagnostico,
        consultation.prescricao,
      );
    } catch (e) {
      showError(e);
    }
  };

  const editPet = async () => {
    try {
      await Services.editPet(
        pet.id,
        pet.avatarUrl,
        pet.nome,
        pet.anoNascimento,
        consultation.peso,
        pet.sexo,
        pet.observacoes,
      );
    } catch (e) {
      showError(e);
    }
  };

  const saveConsultation = consultation => {
    addConsult(consultation);
    editPet();
  };

  const getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={consultation.data}
        mode={'date'}
        onChange={(_, data) =>
          setConsultation({...consultation, data, showDatePicker: false})
        }
      />
    );

    const dateString = moment(consultation.data).format('DD/MM/YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() =>
              setConsultation({...consultation, showDatePicker: true})
            }>
            <View>
              <Text>{dateString}</Text>
            </View>
          </TouchableOpacity>
          {consultation.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker;
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <PetDetails pet={pet} />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Data: </Text>
          {getDatePicker()}
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Peso: </Text>
          <TextInput
            style={styles.input}
            onChangeText={peso => setConsultation({...consultation, peso})}
            placeholder="Informe o peso do pet"
            value={consultation.peso}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Dignostico: </Text>
          <TextInput
            style={styles.input}
            onChangeText={diagnostico =>
              setConsultation({...consultation, diagnostico})
            }
            placeholder="Informe o diagnostico"
            value={consultation.diagnostico}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Prescrição: </Text>
          <TextInput
            style={styles.input}
            onChangeText={prescricao =>
              setConsultation({...consultation, prescricao})
            }
            placeholder="Informe a prescrição"
            value={consultation.prescricao}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            saveConsultation(consultation);
            navigation.goBack();
          }}>
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  formContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  titulo: {
    color: commonStyles.colors.secundary,
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: commonStyles.colors.primary,
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
