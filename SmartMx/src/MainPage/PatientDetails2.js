import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {icons} from '../../constant';
import Divider from '../../reusablecomponent/Divider';

const PatientDetails2 = ({navigation, route}) => {
  const {patient} = route.params;

  console.log('shyam', patient);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <View
          style={{flexDirection: 'row', marginTop: 64, marginHorizontal: 17}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.text}>Patient details</Text>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.box}>
            <View style={{padding: 15}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.diagnosis}>Name</Text>

                <Text style={styles.treatment}>{patient.fullname}</Text>
              </View>

              <Divider />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.diagnosis}>Gender</Text>
                <Text style={styles.treatment}>{patient.gender}</Text>
              </View>

              <Divider />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.diagnosis}>Diagnosis 1</Text>
                <Text style={styles.treatment}>{patient.dignosis1}</Text>
              </View>
              <Divider />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.diagnosis}>Discharged</Text>
                <Text style={styles.treatment}>{patient.discharged}</Text>
              </View>
              <Divider />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.diagnosis}>Speciality</Text>
                <Text style={styles.treatment}>-------</Text>
              </View>
              <Divider />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.diagnosis}>Investigations planned</Text>
                <Text style={styles.treatment}>
                  {patient.investigationplaned}
                </Text>
              </View>

              <Divider />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.diagnosis}>Treatment planned</Text>
                <Text style={styles.treatment}>{patient.treatmentplan}</Text>
              </View>

              <Divider />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.diagnosis}>Status</Text>
                {patient.status ? (
                  <Text style={styles.treatment}>Complete</Text>
                ) : (
                  <Text style={styles.treatment}>Incomplete</Text>
                )}
              </View>
            </View>
          </View>

          <View style={{marginHorizontal: 20}}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
                lineHeight: 24,
                letterSpacing: 0.05,
                fontWeight: 500,
                color: '#10011C',
              }}>
              Comments
            </Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.contend}>{patient.comment}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PatientDetails2;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: 36,
    height: 36,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 1,
    color: '#150124',
    marginLeft: 10,
    marginTop: 5,
  },
  heading: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#10011c',
    marginLeft: '5%',
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.957055,
    borderColor: '#10011C',
    borderRadius: 19.1411,
    shadowColor: '#10011C',
    shadowOffset: {
      width: 0,
      height: 3.82822,
    },
    shadowOpacity: 0.08,
    shadowRadius: 28.7117,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 25,
  },
  contend: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    color: '#000000',
    alignSelf: 'center',
    padding: 15,
    opacity: 0.5,
  },
  diagnosis: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    color: '#10011C',
  },
  treatment: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
    color: '#10011C',
  },
});
