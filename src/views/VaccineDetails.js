import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react';
import {View, SafeAreaView, StatusBar, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {server, showError, showSuccess} from '../common';
import PetDetails from '../components/PetDetails';

export default ({route, navigation}) => {
  const [vaccine, setVaccine] = useState({
    data: route.params.item.data,
    nome: route.params.item.nome,
    status: route.params.item.status,
  });

  usuario = route.params.usuario;
  item = route.params.item;

  editStatusVaccine = async vaccine => {
    try {
      await axios.put(`${server}/pets/${item.petId}/vaccines/${item.id}`, {
        data: vaccine.data,
        nome: vaccine.nome,
        status: vaccine.status,
      });
    } catch (e) {
      showError(e);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <Text>Data</Text>
      <Text>{moment(item.data).format('DD/MM/YYYY')}</Text>
      <Text>Vacina</Text>
      <Text>{item.nome}</Text>
      <Text>Status</Text>
      <Text>{item.status}</Text>

      {item.status !== 'Concluido' && usuario.crmv.trim() > 0 && (
        <View>
          <CheckBox
            title='Trocar status para "Concluído"'
            checked={vaccine.status === 'Concluido'}
            onPress={() =>
              setVaccine({
                ...vaccine,
                status:
                  vaccine.status === 'Pendente' ? 'Concluido' : 'Pendente',
                data: new Date(),
              })
            }
          />
          <TouchableOpacity
            onPress={() => {
              editStatusVaccine(vaccine);
              navigation.goBack();
            }}>
            <Text>{vaccine.status}</Text>
            <Text>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
