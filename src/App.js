import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Button, Icon} from 'react-native-elements';

import commonStyles from './commonStyles';

import Auth from './views/Auth';
import Home from './views/Home';
import PetList from './views/ListPets';
import PetForm from './views/PetForm';
import PetProfile from './views/PetProfile';
import ConsultationForm from './views/ConsultationForm';
import ConsultationDetails from './views/ConsultationDetails';
import VaccineForm from './views/VaccineForm';
import VaccineDetails from './views/VaccineDetails';
import VeterinaryHome from './views/VeterinaryHome';
import QrCodeScanner from './views/QrCodeScanner';

const Stack = createStackNavigator();

export default props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={screenOptions}>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PetList"
          component={PetList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PetForm"
          component={PetForm}
          options={({navigation}) => {
            return {
              title: 'Cadastro do Pet',
              headerTitleAlign: 'center',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Home')}
                  type="clear"
                  icon={<Icon name="home" size={30} color="white" />}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="PetProfile"
          component={PetProfile}
          options={({navigation}) => {
            return {
              title: 'Informações sobre o Pet',
              headerTitleAlign: 'center',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Home')}
                  type="clear"
                  icon={<Icon name="home" size={30} color="white" />}
                />
              ),
            };
          }}
        />

        <Stack.Screen
          name="ConsultationForm"
          component={ConsultationForm}
          options={({navigation}) => {
            return {
              title: 'Cadastro de Consulta',
              headerTitleAlign: 'center',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Home')}
                  type="clear"
                  icon={<Icon name="home" size={30} color="white" />}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="ConsultationDetails"
          component={ConsultationDetails}
          options={({navigation}) => {
            return {
              title: 'Detalhes sobre a Consulta',
              headerTitleAlign: 'center',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Home')}
                  type="clear"
                  icon={<Icon name="home" size={30} color="white" />}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="VaccineForm"
          component={VaccineForm}
          options={({navigation}) => {
            return {
              title: 'Cadastro da Vacina',
              headerTitleAlign: 'center',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Home')}
                  type="clear"
                  icon={<Icon name="home" size={30} color="white" />}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="VaccineDetails"
          component={VaccineDetails}
          options={({navigation}) => {
            return {
              title: 'Detalhes sobre a Vacina',
              headerTitleAlign: 'center',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('Home')}
                  type="clear"
                  icon={<Icon name="home" size={30} color="white" />}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="VeterinaryHome"
          component={VeterinaryHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QrCodeScanner"
          component={QrCodeScanner}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: commonStyles.colors.primary,
  },
  headerTintColor: commonStyles.colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
