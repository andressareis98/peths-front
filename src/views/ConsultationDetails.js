import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react';
import {View, SafeAreaView, StatusBar, Text, StyleSheet} from 'react-native';

import commonStyles from '../commonStyles';
import PetDetails from '../components/PetDetails';

export default ({route, navigation}) => {
  const pet = route.params.pet;
  const consultation = route.params.item;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <PetDetails pet={pet} />
      <View style={styles.containerDetails}>
        <View style={styles.viewData}>
          <Text style={styles.title}>Data</Text>
          <Text style={styles.subtitle}>
            {moment(consultation.data).format('DD/MM/YYYY')}
          </Text>
        </View>

        <View style={styles.viewData}>
          <Text style={styles.title}>Peso</Text>
          <Text style={styles.subtitle}>{consultation.peso}</Text>
        </View>

        <View style={styles.viewData}>
          <Text style={styles.title}>Diagnóstico</Text>
          <Text style={styles.subtitle}>{consultation.diagnostico}</Text>
        </View>

        <View style={styles.viewData}>
          <Text style={styles.title}>Prescrição</Text>
          <Text style={styles.subtitle}>
            {consultation.prescricao ? consultation.prescricao : 'N/A'}
          </Text>
        </View>
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
