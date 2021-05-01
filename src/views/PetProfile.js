import React, {Component} from 'react';
import {View, Text, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {server, showError} from '../common';
import axios from 'axios';
import 'moment/locale/pt-br';
import moment from 'moment';

import commonStyles from '../commonStyles';

const initialState = {
  pet: [],
};

export default class PetProfile extends Component {
  petId = this.props.route.params.petId;

  state = {...initialState};

  componentDidMount = async () => {
    this.loadPet();
  };

  loadPet = async () => {
    try {
      const res = await axios.get(`${server}/pets/${this.petId}`);
      this.setState({pet: res.data[0]});
    } catch (e) {
      showError(e);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View>
          <Avatar
            avatarStyle={{borderRadius: 10}}
            size="large"
            source={{uri: this.state.pet.avatarUrl}}
          />
          <Text>{this.state.pet.nome}</Text>
          <Text>
            {moment(new Date()).format('YYYY') -
              moment(this.state.pet.anoNascimento).format('YYYY')}
          </Text>
          <Text>{this.state.pet.peso}</Text>
          <Text>{this.state.pet.sexo}</Text>
          <Text>{this.state.pet.observacoes}</Text>
        </View>
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
});
