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

import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {showError} from '../common';
import Services from '../services/Services';
import PetDetails from '../components/PetDetails';
import ConsultationCard from '../components/ConsultationCard';
import VaccineCard from '../components/VaccineCard';
import commonStyles from '../commonStyles';

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
      const res = await Services.getPet(petProfile.petId);
      setPetProfile(prev => ({...prev, pet: res.data[0]}));
    } catch (e) {
      showError(e);
    }
  };

  const loadConsultations = async () => {
    try {
      const res = await Services.listConsultations(petProfile.petId);
      setPetProfile(prev => ({...prev, consultations: res.data}));
    } catch (e) {
      showError(e);
    }
  };

  const loadVaccines = async () => {
    try {
      const res = await Services.listVaccines(petProfile.petId);
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
          <Text
            style={[
              styles.textTab,
              petProfile.tabStatus === 'consultas'
                ? styles.textTabActive
                : styles.textTabInative,
            ]}>
            Consultas
          </Text>
          <IconMaterialCommunityIcons
            name="medical-bag"
            size={25}
            color={
              petProfile.tabStatus === 'consultas'
                ? commonStyles.colors.secundary
                : commonStyles.colors.grayDark
            }
          />
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
          <Text
            style={[
              styles.textTab,
              petProfile.tabStatus === 'vacinas'
                ? styles.textTabActive
                : styles.textTabInative,
            ]}>
            Vacinas
          </Text>
          <IconMaterialCommunityIcons
            name="needle"
            size={25}
            color={
              petProfile.tabStatus === 'vacinas'
                ? commonStyles.colors.secundary
                : commonStyles.colors.grayDark
            }
          />
        </TouchableOpacity>
      </View>

      {petProfile.tabStatus === 'consultas' && (
        <>
          {petProfile.consultations.length === 0 && (
            <View style={styles.listEmpty}>
              <Text>Não há consultas cadastradas</Text>
            </View>
          )}
          {petProfile.consultations.length > 0 && (
            <FlatList
              data={petProfile.consultations.sort((a, b) => b.data > a.data)}
              keyExtractor={item => `${item.id}`}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ConsultationDetails', {
                      item,
                      pet: petProfile.pet,
                    })
                  }>
                  <ConsultationCard {...item} />
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}

      {petProfile.tabStatus === 'vacinas' && (
        <>
          {petProfile.vaccines.length == 0 && (
            <View style={styles.listEmpty}>
              <Text>Não há vacinas cadastradas</Text>
            </View>
          )}

          {petProfile.vaccines.length > 0 && (
            <FlatList
              data={petProfile.vaccines.sort((a, b) => b.data > a.data)}
              keyExtractor={item => `${item.id}`}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('VaccineDetails', {
                      usuario: petProfile.usuario,
                      item,
                      pet: petProfile.pet,
                    })
                  }>
                  <VaccineCard {...item} />
                </TouchableOpacity>
              )}
            />
          )}
        </>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: commonStyles.colors.white,
  },
  tab: {
    width: Dimensions.get('window').width / 2,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTab: {
    fontSize: 15,
  },
  textTabActive: {
    color: commonStyles.colors.secundary,
    fontWeight: 'bold',
  },
  textTabInative: {
    color: commonStyles.colors.grayDark,
  },
  btnTabActive: {
    borderBottomWidth: 5,
    borderBottomColor: commonStyles.colors.secundary,
  },
  viewList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: commonStyles.colors.secundary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
