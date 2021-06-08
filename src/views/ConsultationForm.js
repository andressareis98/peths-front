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
import {showError} from '../common';
import PetDetails from '../components/PetDetails';
import commonStyles from '../commonStyles';
import {ScrollView} from 'react-native';

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
            style={styles.inputData}
            onPress={() =>
              setConsultation({...consultation, showDatePicker: true})
            }>
            <View>
              <Text style={styles.textInput}>{dateString}</Text>
            </View>
          </TouchableOpacity>
          {consultation.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <PetDetails pet={pet} />
      <View style={styles.containerDetails}>
        <ScrollView>
          <View style={styles.viewData}>
            <Text style={styles.title}>Data: </Text>
            {getDatePicker()}
          </View>

          <View style={styles.viewData}>
            <Text style={styles.title}>Peso(Kg): </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={commonStyles.colors.secundary}
              onChangeText={peso => setConsultation({...consultation, peso})}
              placeholder="Informe o peso do animal(Kg)"
              value={consultation.peso}
            />
          </View>

          <View style={styles.viewData}>
            <Text style={styles.title}>Dignóstico: </Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.largeTextInput}
              placeholderTextColor={commonStyles.colors.secundary}
              onChangeText={diagnostico =>
                setConsultation({...consultation, diagnostico})
              }
              placeholder="Informe o diagnóstico"
              value={consultation.diagnostico}
            />
          </View>

          <View style={styles.viewData}>
            <Text style={styles.title}>Prescrição: </Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.largeTextInput}
              placeholderTextColor={commonStyles.colors.secundary}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.primary,
    paddingHorizontal: 20,
  },
  containerDetails: {
    flex: 1,
    backgroundColor: commonStyles.colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  viewData: {
    marginBottom: 15,
  },
  title: {
    color: commonStyles.colors.secundary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: commonStyles.colors.black,
  },
  containerCheckbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 47,
    color: commonStyles.colors.secundary,
    marginTop: 5,
    backgroundColor: commonStyles.colors.lightBlue,
    borderRadius: 50,
    paddingLeft: 17,
  },
  largeTextInput: {
    width: '100%',
    height: 100,
    color: commonStyles.colors.secundary,
    marginTop: 5,
    backgroundColor: commonStyles.colors.lightBlue,
    borderRadius: 30,
    paddingLeft: 17,
  },
  inputData: {
    width: '100%',
    height: 47,
    backgroundColor: commonStyles.colors.lightBlue,
    marginTop: 5,
    borderRadius: 50,
    paddingLeft: 17,
    justifyContent: 'center',
    color: commonStyles.colors.secundary,
  },
  textInput: {
    color: commonStyles.colors.secundary,
  },
  button: {
    backgroundColor: commonStyles.colors.secundary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 50,
    paddingVertical: 12,
  },
  textButton: {
    color: commonStyles.colors.white,
    fontSize: 15,
  },
});
