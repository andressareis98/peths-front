import React, {Component} from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {server, showError} from '../common';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyles from '../commonStyles';

const initialState = {
  pets: [],
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

  render() {
    const year = moment().locale('pt-br').format('YYYY');
    return (
      <View style={styles.container}>
        {this.state.pets.map(p => (
          <ListItem key={p.id}>
            <Avatar rounded size="large" source={{uri: p.avatarUrl}} />
            <ListItem.Content style={styles.listItem}>
              <View>
                <Text>Nome: {p.nome}</Text>
                <Text>
                  Idade: {year - moment(p.anoNascimento).format('YYYY')}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{marginRight: 25}}
                  onPress={() => this.props.navigation.navigate('PetForm', p)}>
                  <Icon size={40} name="pencil" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deletePet(p.id)}>
                  <Icon size={40} name="trash" />
                </TouchableOpacity>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addButton}
          onPress={() => this.props.navigation.navigate('PetForm')}>
          <Icon name="plus" size={20} color={commonStyles.colors.white} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.colors.gray,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: commonStyles.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
