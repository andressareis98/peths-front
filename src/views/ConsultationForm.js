import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Platform, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {server, showError, showSuccess} from '../common';

export default ({route, navigation}) => {
  const [consultation, setConsultation] = useState({
    data: new Date(),
    peso: '',
    diagnostico: '',
    prescricao: '',
    showDatePicker: false,
  });

  pet = route.params.id;

  addConsult = async consultation => {
    try {
      await axios.post(`${server}/pets/${pet}/consultations`, {
        data: consultation.data,
        peso: consultation.peso,
        diagnostico: consultation.diagnostico,
        prescricao: consultation.prescricao,
      });
    } catch (e) {
      showError(e);
    }
  };

  /* saveConsultation = (pet, consultation) => {
    addConsult(consultation);
    editPet(pet);
  }; */

  getDatePicker = () => {
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
  console.warn(this.pet);
  return (
    <View>
      <Text>Data: </Text>
      {this.getDatePicker()}

      <Text>Peso</Text>
      <TextInput
        onChangeText={peso => setConsultation({...consultation, peso})}
        placeholder="Informe o peso do pet"
        value={consultation.peso}
      />
      <Text>Dignostico</Text>
      <TextInput
        onChangeText={diagnostico =>
          setConsultation({...consultation, diagnostico})
        }
        placeholder="Informe o diagnostico"
        value={consultation.diagnostico}
      />

      <Text>Precrição</Text>
      <TextInput
        onChangeText={prescricao =>
          setConsultation({...consultation, prescricao})
        }
        placeholder="Informe a prescrição"
        value={consultation.prescricao}
      />

      {/* <TouchableOpacity
        onPress={() => {
          this.saveConsultation(pet, consultation);
          navigation.goBack();
        }}>
        <Text>Salvar</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          this.addConsult(consultation);
          navigation.goBack();
        }}>
        <Text>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};
