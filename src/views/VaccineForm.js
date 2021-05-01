import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, TextInput, Platform, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {server, showError, showSuccess} from '../common';
import PetDetails from '../components/PetDetails';

export default ({route, navigation}) => {
  const [vaccine, setVaccine] = useState({
    data: new Date(),
    nome: '',
    status: '',
    showDatePicker: false,
  });

  pet = route.params;

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
    <View>
      <PetDetails pet={pet} />
      <Text>Data:</Text>
      {this.getDatePicker()}
    </View>
  );
};
