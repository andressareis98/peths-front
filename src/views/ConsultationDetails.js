import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';
import PetDetails from '../components/PetDetails';

export default ({route, navigation}) => {
  consultation = route.params;
  return (
    <SafeAreaView>
      <StatusBar />
      <Text>Data</Text>
      <Text>{moment(this.consultation.data).format('DD/MM/YYYY')}</Text>
      <Text>Peso</Text>
      <Text>{this.consultation.peso}</Text>
      <Text>Diagnostico</Text>
      <Text>{this.consultation.diagnostico}</Text>
      <Text>Prescricao</Text>
      <Text>
        {this.consultation.prescricao ? this.consultation.prescricao : 'N/A'}
      </Text>
    </SafeAreaView>
  );
};
