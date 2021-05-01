import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Platform, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {server, showError, showSuccess} from '../common';
import PetDetails from '../components/PetDetails';

export default ({route, navigation}) => {
  const [consultation, setConsultation] = useState({
    data: new Date(),
    peso: '',
    diagnostico: '',
    prescricao: '',
    showDatePicker: false,
  });

  pet = route.params;

  addConsult = async consultation => {
    try {
      await axios.post(`${server}/pets/${pet.id}/consultations`, {
        data: consultation.data,
        peso: consultation.peso,
        diagnostico: consultation.diagnostico,
        prescricao: consultation.prescricao,
      });
    } catch (e) {
      showError(e);
    }
  };

  editPet = async () => {
    try {
      await axios.put(`${server}/pets/${pet.id}`, {
        avatarUrl: pet.avatarUrl,
        nome: pet.nome,
        anoNascimento: pet.anoNascimento,
        peso: consultation.peso,
        sexo: pet.sexo,
        observacoes: pet.observacoes,
      });
    } catch (e) {
      showError(e);
    }
  };

  saveConsultation = consultation => {
    addConsult(consultation);
    editPet();
  };

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

  return (
    <View>
      <PetDetails pet={pet} />
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

      <TouchableOpacity
        onPress={() => {
          this.saveConsultation(consultation);
          navigation.goBack();
        }}>
        <Text>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};
