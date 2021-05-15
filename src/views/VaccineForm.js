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
            style={styles.inputData}
            onPress={() => setVaccine({...vaccine, showDatePicker: true})}>
            <View>
              <Text style={styles.textInput}>{dateString}</Text>
            </View>
          </TouchableOpacity>
          {vaccine.showDatePicker && datePicker}
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
        <Text style={styles.title}>Ação: </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.containerCheckbox}>
            <CheckBox
              containerStyle={{marginLeft: 0}}
              checkedColor={commonStyles.colors.primary}
              uncheckedColor={commonStyles.colors.primary}
              center
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
            <Text>Aplicar Vacina</Text>
          </View>
          <View style={styles.containerCheckbox}>
            <CheckBox
              containerStyle={{marginLeft: 0}}
              checkedColor={commonStyles.colors.primary}
              uncheckedColor={commonStyles.colors.primary}
              center
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
            <Text>Agendar Vacina</Text>
          </View>
        </View>

        <View style={styles.viewData}>
          <Text style={styles.title}>Vacina</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={commonStyles.colors.secundary}
            onChangeText={nome => setVaccine({...vaccine, nome})}
            placeholder="Informe o nome"
            value={vaccine.nome}
          />
        </View>

        {!vaccine.isApplyVaccine && (
          <View style={styles.viewData}>
            <Text style={styles.title}>Data:</Text>
            {getDatePicker()}
          </View>
        )}

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
    paddingTop: 56,
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
    color: commonStyles.colors.secundary,
    height: 47,
    marginTop: 5,
    backgroundColor: commonStyles.colors.lightBlue,
    borderRadius: 50,
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
  },
});
