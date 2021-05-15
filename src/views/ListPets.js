import React, {useState, useCallback} from 'react';
import {Avatar} from 'react-native-elements';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {showError} from '../common';
import PetAge from '../components/PetAge';
import Services from '../services/Services';
import commonStyles from '../commonStyles';

export default ({usuario, navigation}) => {
  const [pet, setPet] = useState({
    pets: [],
  });

  useFocusEffect(
    useCallback(() => {
      loadPets();
      return () => loadPets();
    }, []),
  );

  const loadPets = async () => {
    try {
      const res = await Services.lisPets();
      setPet({pets: res.data});
    } catch (e) {
      showError(e);
    }
  };

  const deletePet = async id => {
    try {
      await Services.deletePet(id);
      await loadPets();
    } catch (e) {
      showError(e);
    }
  };

  const confirmPetDeletion = pet => {
    Alert.alert('Excluir Pet', `Deseja excluir o pet ${pet.nome}?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {text: 'Deletar pet', onPress: () => deletePet(pet.id)},
    ]);
  };

  const alertlogout = () => {
    Alert.alert('Sair', `Deseja sair da sua conta?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => logout(),
      },
    ]);
  };

  const logout = () => {
    navigation.navigate('Auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.containerTitle}>
        <Text numberOfLines={2} style={styles.title}>
          Encontre o seu pet
        </Text>
        <TouchableOpacity onPress={() => alertlogout()}>
          <Ionicons
            name="exit-outline"
            size={40}
            color={commonStyles.colors.white}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.listArea}
        data={pet.pets}
        renderItem={({item}) => (
          <View style={styles.petItem}>
            <TouchableOpacity
              style={styles.seeProfile}
              onPress={() =>
                navigation.navigate('PetProfile', {
                  petId: item.id,
                  usuario: usuario,
                })
              }>
              <Avatar
                avatarStyle={{borderRadius: 10}}
                size="large"
                source={{uri: item.avatarUrl}}
              />
              <View>
                <View style={styles.dataPetItem}>
                  <Text style={styles.textBoldPetItem}>Nome: </Text>
                  <Text style={styles.textPetItem}>{item.nome}</Text>
                </View>
                <View style={styles.dataPetItem}>
                  <Text style={styles.textBoldPetItem}>Idade: </Text>
                  <Text style={styles.textPetItem}>
                    <PetAge anoNascimento={item.anoNascimento} />
                  </Text>
                </View>
                <View style={styles.dataPetItem}>
                  <Text style={styles.textBoldPetItem}>VER HISTÓRICO</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={() => navigation.navigate('PetForm', item)}>
                <Icon style={styles.editButton} size={35} name="pencil" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmPetDeletion(item)}>
                <Icon style={styles.deleteButton} size={35} name="trash" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => navigation.navigate('PetForm')}>
        <Icon name="plus" size={20} color={commonStyles.colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.primary,
    padding: 15,
  },
  containerTitle: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: commonStyles.colors.white,
  },
  listArea: {
    marginTop: 30,
    marginBottom: 15,
  },
  petItem: {
    flexDirection: 'row',
    backgroundColor: commonStyles.colors.white,
    marginBottom: 20,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  dataPetItem: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  textBoldPetItem: {
    color: commonStyles.colors.secundary,
    fontSize: 17,
    fontWeight: 'bold',
  },
  textPetItem: {
    fontSize: 17,
    color: commonStyles.colors.grayDark,
  },
  seeProfile: {
    flexDirection: 'row',
    width: '75%',
    alignItems: 'center',
  },
  textSeeProfile: {
    color: commonStyles.colors.secundary,
  },
  buttons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 15,
  },
  editButton: {
    color: commonStyles.colors.tertiary,
    marginRight: 15,
  },
  deleteButton: {
    color: 'red',
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
