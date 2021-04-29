import React, {Component} from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {server, showError} from '../common';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyles from '../commonStyles';

const initialState = {
  pets: [],
  refreshing: false,
};

export default class PetList extends Component {
  state = {...initialState};

  componentDidMount = async () => {
    this.loadPets();
  };

  loadPets = async () => {
    try {
      const res = await axios.get(`${server}/pets`);
      this.setState({pets: res.data});
    } catch (e) {
      showError(e);
    }
  };

  confirmPetDeletion(pet) {
    return Alert.alert('Excluir', `Deseja excluir o pet ${pet.nome}?`, {
      text: 'Sim',
      onPress: () => this.deleteTask(pet),
    });
  }

  deletePet = async id => {
    try {
      await axios.delete(`${server}/pets/${id}`);
      await this.loadPets();
    } catch (e) {
      showError(e);
    }
  };

  onRefresh = () => {
    this.setState({refreshing: false});
    this.loadPets();
  };

  render() {
    const year = moment().locale('pt-br').format('YYYY');
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Text numberOfLines={2} style={styles.headerTitle}>
          Encontre o seu pet
        </Text>

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}></RefreshControl>
          }
          style={styles.listArea}
          data={this.state.pets}
          renderItem={({item}) => (
            <View style={styles.petItem}>
              <TouchableOpacity style={styles.seeProfile}>
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
                      {year - moment(item.anoNascimento).format('YYYY')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('PetForm', item)
                  }>
                  <Icon style={styles.editButton} size={35} name="pencil" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deletePet(item.id)}>
                  <Icon style={styles.deleteButton} size={35} name="trash" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addButton}
          onPress={() => this.props.navigation.navigate('PetForm')}>
          <Icon name="plus" size={20} color={commonStyles.colors.secundary} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.primary,
    padding: 15,
  },
  headerTitle: {
    marginTop: 30,
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
    borderRadius: 10,
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
    backgroundColor: commonStyles.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
