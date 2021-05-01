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
import Icon from 'react-native-vector-icons/FontAwesome';

import PetDetails from '../components/PetDetails';
import ConsultationCard from '../components/ConsultationCard';
import VaccineCard from '../components/VaccineCard';
import commonStyles from '../commonStyles';

const initialState = {
  pet: [],
  consultations: [],
  vaccines: [],
  tabStatus: 'consultas',
  form: 'ConsultationForm',
};

export default class PetProfile extends Component {
  petId = this.props.route.params.petId;
  usuario = this.props.route.params.usuario;

  state = {...initialState};

  componentDidMount = async () => {
    this.loadPet();
    this.loadConsultations();
    this.loadVaccines();
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

  loadVaccines = async () => {
    try {
      const res = await axios.get(`${server}/pets/${this.petId}/vaccines`);
      this.setState({vaccines: res.data});
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
              onPress={() =>
                this.setState({
                  tabStatus: 'consultas',
                  form: 'ConsultationForm',
                })
              }
              style={[
                styles.tab,
                this.state.tabStatus === 'consultas' && styles.btnTabActive,
              ]}>
              <Text>Consultas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({tabStatus: 'vacinas', form: 'VaccineForm'})
              }
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

            {this.state.tabStatus === 'vacinas' && (
              <View>
                <FlatList
                  data={this.state.vaccines}
                  keyExtractor={item => `${item.id}`}
                  renderItem={({item}) => (
                    <TouchableOpacity>
                      <VaccineCard {...item} />
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>

        {this.usuario.crmv.trim() <= 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addButton}
            onPress={() =>
              this.props.navigation.navigate(this.state.form, this.state.pet)
            }>
            <Icon name="plus" size={20} color={commonStyles.colors.secundary} />
          </TouchableOpacity>
        )}
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
