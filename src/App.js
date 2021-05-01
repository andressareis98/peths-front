import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import commonStyles from './commonStyles';

import Auth from './views/Auth';
import PetList from './views/ListPets';
import PetForm from './views/PetForm';
import PetProfile from './views/PetProfile';
import ConsultationForm from './views/ConsultationForm';
import VaccineForm from './views/VaccineForm';
import VeterinaryHome from './views/VeterinaryHome';

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
          name="PetList"
          component={PetList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PetForm"
          options={{title: 'Cadastro do Pet'}}
          component={PetForm}
        />
        <Stack.Screen
          name="PetProfile"
          component={PetProfile}
          options={{title: 'Informações do pet', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="ConsultationForm"
          options={{title: 'Cadastro de Consulta'}}
          component={ConsultationForm}
        />
        <Stack.Screen
          name="VaccineForm"
          options={{title: 'Cadastro de Vacina'}}
          component={VaccineForm}
        />
        <Stack.Screen
          name="VeterinaryHome"
          component={VeterinaryHome}
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
