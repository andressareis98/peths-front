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
import {CheckBox} from 'react-native-elements';

import Services from '../services/Services';
import {showError} from '../common';
import PetDetails from '../components/PetDetails';
import commonStyles from '../commonStyles';

export default ({route, navigation}) => {
  const [vaccine, setVaccine] = useState({
    data: new Date(),
    nome: '',
    status: 'Concluido',
    showDatePicker: false,
    isApplyVaccine: true,
  });

  pet = route.params;

  const addVaccine = async vaccine => {
    try {
      await Services.newVaccine(
        pet.id,
        vaccine.data,
        vaccine.nome,
        vaccine.status,
      );
    } catch (e) {
      showError(e);
    }
  };

  const getDatePicker = () => {
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
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <PetDetails pet={pet} />
      <View style={styles.container}>
        <Text>Ação: </Text>
        <View style={{flexDirection: 'row'}}>
          <CheckBox
            center
            title="Aplicar Vacina"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={vaccine.isApplyVaccine}
            onPress={() =>
              setVaccine({
                ...vaccine,
                isApplyVaccine: true,
                status: 'Concluído',
              })
            }
          />
          <CheckBox
            center
            title="Agendar Vacina"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={!vaccine.isApplyVaccine}
            onPress={() =>
              setVaccine({
                ...vaccine,
                isApplyVaccine: false,
                status: 'Pendente',
              })
            }
          />
        </View>

        {!vaccine.isApplyVaccine && <Text style={styles.titulo}>Data:</Text>}
        {!vaccine.isApplyVaccine && getDatePicker()}

        <Text style={styles.titulo}>Vacina</Text>
        <TextInput
          style={styles.input}
          onChangeText={nome => setVaccine({...vaccine, nome})}
          placeholder="Informe o nome"
          value={vaccine.nome}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addVaccine(vaccine);
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
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: commonStyles.colors.primary,
    marginBottom: 10,
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
