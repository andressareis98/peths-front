import moment from 'moment';
import React, {useState} from 'react';
import {View, SafeAreaView, StatusBar, Text, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {showError} from '../common';
import commonStyles from '../commonStyles';
import PetDetails from '../components/PetDetails';
import Services from '../services/Services';

export default ({route, navigation}) => {
  const [vaccine, setVaccine] = useState({
    data: route.params.item.data,
    nome: route.params.item.nome,
    status: route.params.item.status,
  });

  usuario = route.params.usuario;
  const item = route.params.item;
  const pet = route.params.pet;

  editStatusVaccine = async vaccine => {
    try {
      await Services.editVaccine(
        item.petId,
        item.id,
        vaccine.data,
        vaccine.nome,
        vaccine.status,
      );
    } catch (e) {
      showError(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <PetDetails pet={pet} />

      <View style={styles.containerDetails}>
        <View style={styles.viewData}>
          <Text style={styles.title}>Data</Text>
          <Text style={styles.subtitle}>
            {moment(item.data).format('DD/MM/YYYY')}
          </Text>
        </View>

        <View style={styles.viewData}>
          <Text style={styles.title}>Vacina</Text>
          <Text style={styles.subtitle}>{item.nome}</Text>
        </View>

        <View style={styles.viewData}>
          <Text style={styles.title}>Status</Text>
          <Text style={styles.subtitle}>{item.status}</Text>
        </View>

        {item.status !== 'Concluido' && this.usuario.crmv.trim() > 0 && (
          <>
            <View style={styles.containerCheckbox}>
              <CheckBox
                size={30}
                checkedColor={commonStyles.colors.primary}
                uncheckedColor={commonStyles.colors.primary}
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
              <Text style={styles.textContainerCheck}>
                Trocar status para Concluído
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                editStatusVaccine(vaccine);
                navigation.goBack();
              }}>
              <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
          </>
        )}
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
    paddingLeft: 41,
    paddingRight: 14,
    paddingTop: 56,
  },
  viewData: {
    marginBottom: 15,
  },
  title: {
    color: commonStyles.colors.secundary,
    fontSize: 20,
  },
  subtitle: {
    color: commonStyles.colors.black,
    fontSize: 15,
  },
  containerCheckbox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  textContainerCheck: {
    marginLeft: 5,
    fontSize: 15,
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
