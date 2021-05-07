import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {server, showError} from '../common';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import PetDetails from '../components/PetDetails';
import ConsultationCard from '../components/ConsultationCard';
import VaccineCard from '../components/VaccineCard';
import commonStyles from '../commonStyles';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {Profiler} from 'react';

export default ({route, navigation}) => {
  const [petProfile, setPetProfile] = useState({
    petId: route.params.petId,
    usuario: route.params.usuario,
    pet: [],
    consultations: [],
    vaccines: [],
    tabStatus: 'consultas',
    form: 'ConsultationForm',
  });

  console.log({petProfile});

  useFocusEffect(
    useCallback(() => {
      loadProfile();
      return () => loadProfile();
    }, []),
  );

  const loadProfile = async () => {
    await loadPet();
    await loadConsultations();
    await loadVaccines();
  };

  const loadPet = async () => {
    try {
      const res = await axios.get(`${server}/pets/${petProfile.petId}`);
      setPetProfile(prev => ({...prev, pet: res.data[0]}));
    } catch (e) {
      showError(e);
    }
  };

  const loadConsultations = async () => {
    try {
      const res = await axios.get(
        `${server}/pets/${petProfile.petId}/consultations`,
      );
      setPetProfile(prev => ({...prev, consultations: res.data}));
    } catch (e) {
      showError(e);
    }
  };

  const loadVaccines = async () => {
    try {
      const res = await axios.get(
        `${server}/pets/${petProfile.petId}/vaccines`,
      );
      setPetProfile(prev => ({...prev, vaccines: res.data}));
    } catch (e) {
      showError(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <PetDetails pet={petProfile.pet} />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() =>
            setPetProfile(prev => ({
              ...prev,
              tabStatus: 'consultas',
              form: 'ConsultationForm',
            }))
          }
          style={[
            styles.tab,
            petProfile.tabStatus === 'consultas' && styles.btnTabActive,
          ]}>
          <Text>Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setPetProfile(prev => ({
              ...prev,
              tabStatus: 'vacinas',
              form: 'VaccineForm',
            }))
          }
          style={[
            styles.tab,
            petProfile.tabStatus === 'vacinas' && styles.btnTabActive,
          ]}>
          <Text>Vacinas</Text>
        </TouchableOpacity>
      </View>

      {petProfile.tabStatus === 'consultas' && (
        <FlatList
          data={petProfile.consultations}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ConsultationDetails', item)}>
              <ConsultationCard {...item} />
            </TouchableOpacity>
          )}
        />
      )}

      {petProfile.tabStatus === 'vacinas' && (
        <FlatList
          data={petProfile.vaccines}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('VaccineDetails', {
                  usuario: petProfile.usuario,
                  item,
                })
              }>
              <VaccineCard {...item} />
            </TouchableOpacity>
          )}
        />
      )}

      {petProfile?.usuario?.crmv.trim() > 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addButton}
          onPress={() => navigation.navigate(petProfile.form, petProfile.pet)}>
          <Icon name="plus" size={20} color={commonStyles.colors.white} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.primary,
  },
  petDatails: {
    margin: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: commonStyles.colors.white,
  },
  tab: {
    width: Dimensions.get('window').width / 2,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: commonStyles.colors.primary,
    padding: 10,
    justifyContent: 'center',
  },
  btnTabActive: {
    borderBottomWidth: 3,
    borderBottomColor: commonStyles.colors.secundary,
  },
  listTabContainer: {
    margin: 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: commonStyles.colors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
