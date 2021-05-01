import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Platform, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {CheckBox} from 'react-native-elements';

import {server, showError, showSuccess} from '../common';
import PetDetails from '../components/PetDetails';

export default ({route, navigation}) => {
  const [vaccine, setVaccine] = useState({
    data: new Date(),
    nome: '',
    status: 'Concluido',
    showDatePicker: false,
    isApplyVaccine: true,
  });

  pet = route.params;

  addVaccine = async vaccine => {
    try {
      await axios.post(`${server}/pets/${pet.id}/vaccines`, {
        data: vaccine.data,
        nome: vaccine.nome,
        status: vaccine.status,
      });
    } catch (e) {
      showError(e);
    }
  };

  console.warn(pet);

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={vaccine.data}
        mode={'date'}
        onChange={(_, data) =>
          setVaccine({...vaccine, data, showDatePicker: false})
        }
      />
    );

    const dateString = moment(vaccine.data).format('DD/MM/YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => setVaccine({...vaccine, showDatePicker: true})}>
            <View>
              <Text>{dateString}</Text>
            </View>
          </TouchableOpacity>
          {vaccine.showDatePicker && datePicker}
        </View>
      );
    }
    return datePicker;
  };

  return (
    <View style={{flex: 1}}>
      <PetDetails pet={pet} />
      <Text>Ação: </Text>
      <View style={{flexDirection: 'row'}}>
        <CheckBox
          center
          title="Aplicar Vacina"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={vaccine.isApplyVaccine}
          onPress={() =>
            setVaccine({...vaccine, isApplyVaccine: true, status: 'Concluído'})
          }
        />
        <CheckBox
          center
          title="Agendar Vacina"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={!vaccine.isApplyVaccine}
          onPress={() =>
            setVaccine({...vaccine, isApplyVaccine: false, status: 'Pendente'})
          }
        />
      </View>

      {!vaccine.isApplyVaccine && <Text>Data:</Text>}
      {!vaccine.isApplyVaccine && this.getDatePicker()}

      <Text>Vacina</Text>
      <TextInput
        onChangeText={nome => setVaccine({...vaccine, nome})}
        placeholder="Informe o nome"
        value={vaccine.nome}
      />

      <TouchableOpacity
        onPress={() => {
          this.addVaccine(vaccine);
          navigation.goBack();
        }}>
        <Text>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};
