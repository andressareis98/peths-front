import React, {Component} from 'react';
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
import {server, showError} from '../common';
import axios from 'axios';
import 'moment/locale/pt-br';
import moment from 'moment';

import PetDetails from '../components/PetDetails';
import ConsultationCard from '../components/ConsultationCard';
import commonStyles from '../commonStyles';

const initialState = {
  pet: [],
  consultations: [],
  vaccines: [],
  tabStatus: 'consultas',
};

export default class PetProfile extends Component {
  petId = this.props.route.params.petId;
  usuario = this.props.route.params.usuario;

  state = {...initialState};

  componentDidMount = async () => {
    this.loadPet();
    this.loadConsultations();
  };

  loadPet = async () => {
    try {
      const res = await axios.get(`${server}/pets/${this.petId}`);
      this.setState({pet: res.data[0]});
    } catch (e) {
      showError(e);
    }
  };

  loadConsultations = async () => {
    try {
      const res = await axios.get(`${server}/pets/${this.petId}/consultations`);
      this.setState({consultations: res.data});
    } catch (e) {
      showError(e);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <View>
          <PetDetails pet={this.state.pet} />

          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => this.setState({tabStatus: 'consultas'})}
              style={[
                styles.tab,
                this.state.tabStatus === 'consultas' && styles.btnTabActive,
              ]}>
              <Text>Consultas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({tabStatus: 'vacinas'})}
              style={[
                styles.tab,
                this.state.tabStatus === 'vacinas' && styles.btnTabActive,
              ]}>
              <Text>Vacinas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listTabContainer}>
            {this.state.tabStatus === 'consultas' && (
              <FlatList
                data={this.state.consultations}
                keyExtractor={item => `${item.id}`}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <ConsultationCard {...item} />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

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
});
