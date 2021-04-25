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

  render() {
    const year = moment().locale('pt-br').format('YYYY');
    return (
      <View style={styles.container}>
        {this.state.pets.map((p, i) => (
          <ListItem key={i}>
            <Avatar rounded size="large" source={{uri: p.avatarUrl}} />
            <ListItem.Content>
              <Text>Nome: {p.nome}</Text>
              <Text>
                Idade: {year - moment(p.anoNascimento).format('YYYY')}
              </Text>
            </ListItem.Content>
          </ListItem>
        ))}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addButton}
          onPress={() => navigation.push('PetForm')}>
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
