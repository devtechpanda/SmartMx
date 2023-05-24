import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { icons, images } from '../../constant';
import TextButton from '../../reusablecomponent/TextButton';

const archiveIcons = {
  active: icons.archive_minus,
  inactive: icons.archive,
};

const UnitAData = ({ navigation }) => {
  const [activeArchive, setActiveArchive] = React.useState(false);
  const handleArchivePress = () => {
    setActiveArchive(!activeArchive);
  };
  const [groupDetails, setGroupDetails] = React.useState([
    {
      id: 1,
      image: images.personal1,
      name: 'Robert Fox',
      assigned: 'Dr. Dianne Russell',
      dignosis: 'AF with RHD',
      location: '2464 Royal Ln. Mesa, ',
    },
    {
      id: 2,
      image: images.personal2,
      assigned: 'Dr. Dianne Russell',
      name: 'Dianne Russell',
      dignosis: 'AF with RHD',
      location: '2464 Royal Ln. Mesa, ',
    },
    {
      id: 3,
      image: images.personal3,
      name: 'Jacob Jones',
      assigned: 'Dr. Dianne Russell',
      dignosis: 'AF with RHD',
      location: '2464 Royal Ln. Mesa, ',
    },
    {
      id: 4,
      image: images.personal4,
      name: 'Kristin Watson',
      assigned: 'Dr. Dianne Russell',
      dignosis: 'AF with RHD',
      location: '2464 Royal Ln. Mesa, ',
    },
    {
      id: 5,
      image: images.personal4,
      name: 'Kristin Watson',
      assigned: 'Dr. Dianne Russell',
      dignosis: 'AF with RHD',
      location: '2464 Royal Ln. Mesa, ',
    },
    {
      id: 6,
      image: images.personal4,
      name: 'Kristin Watson',
      assigned: 'Dr. Dianne Russell',
      dignosis: 'AF with RHD',
      location: '2464 Royal Ln. Mesa, ',
    },
    {
      id: 7,
      image: images.personal4,
      name: 'Kristin Watson',
      assigned: 'Dr. Dianne Russell',
      dignosis: 'AF with RHD',
      location: '2464 Royal Ln. Mesa, ',
    },
  ]);
  const Item = ({ item, index }) => (
    <View
      style={{
        backgroundColor:
          index % 2 === 0
            ? 'rgba(250, 128, 128, 0.3)'
            : 'rgba(6, 194, 112, 0.3)',
        padding: 16,
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 15,
        ...(index % 3 === 2
          ? {
            borderWidth: 0.5,
            borderColor: '#10011C',
            backgroundColor: 'transparent',
          }
          : {}),
      }}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate('PatientDetails2')}>
        <Image source={item.image} />
        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.dignosis}>Assigned : {item.assigned}</Text>
          <Text style={styles.dignosis}>Diagnosis : {item.dignosis}</Text>
          <Text style={styles.dignosis}>Location : {item.location}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={handleArchivePress}>
          <Image
            source={activeArchive ? archiveIcons.active : archiveIcons.inactive}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={images.dashBg}
        style={{
          widht: '100%',
          height: '100%',
        }}
        resizeMode="cover">
        <View
          style={{ flexDirection: 'row', marginTop: 64, marginHorizontal: 17 }}>
          <TouchableOpacity onPress={() => navigation.navigate('UnitA')}>
            <Image source={icons.arrow_back} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.text}>Unit A</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            marginHorizontal: 20,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 24,
              letterSpacing: 1,
              color: '#150124',
            }}>
            Group Admin :
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
              fontWeight: 500,
              lineHeight: 24,
              letterSpacing: 1,
              color: '#150124',
            }}>
            Cameron Williamson
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={groupDetails}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <TextButton
            title={'Add New Patient details'}
            bgColor={'#6D21A9'}
            color={'#ffffff'}
            icon={icons.plus}
            // onPress={() => navigation.navigate('AddPatient')}
            onPress={() => navigation.navigate('AddPatient2')}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default UnitAData;

const styles = StyleSheet.create({
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
  name: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.05,
    color: '#10011C',
  },
  dignosis: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 18,
    letterSpacing: 0.05,
    color: '#10011C',
    opacity: 0.75,
  },
});
