import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/splashscreen/SplashScreen';
import {ForgetPwd, MoreDetails, SignIn, SignUp} from './src/usercredential';
import {
  AddPatient,
  AddPatient2,
  BookedMark,
  Home,
  PatientDetails,
  PatientDetails2,
  PersonalWorkSpace,
  Profile,
  UnitA,
  UnitAData,
  UnitWorkSpace,
} from './src/MainPage';
import Demo from './src/usercredential/Demo';
import OtpScreen from './src/usercredential/OtpScreen';
import ConfimPassword from './src/usercredential/ConfimPassword';
import Edit from './src/MainPage/Edit';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPwd" component={ForgetPwd} />
        <Stack.Screen name="MoreDetails" component={MoreDetails} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="pWorkSpace" component={PersonalWorkSpace} />
        <Stack.Screen name="AddPatient" component={AddPatient} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UWorkSpace" component={UnitWorkSpace} />
        <Stack.Screen name="UnitA" component={UnitA} />
        <Stack.Screen name="UnitAData" component={UnitAData} />
        <Stack.Screen name="BookMarked" component={BookedMark} />
        <Stack.Screen name="AddPatient2" component={AddPatient2} />
        <Stack.Screen name="PatientDetails" component={PatientDetails} />
        <Stack.Screen name="PatientDetails2" component={PatientDetails2} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="ConfimPassword" component={ConfimPassword} />
        <Stack.Screen name="Edit" component={Edit} />

        <Stack.Screen name="Demo" component={Demo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
