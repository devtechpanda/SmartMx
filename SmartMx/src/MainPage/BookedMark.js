import React, {useEffect, useState} from 'react';
import axios from 'axios';
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
import {icons, images} from '../../constant';

const BookedMark = ({navigation, route}) => {
  const [bookMarkedData, setBookMarkedData] = useState([]);

  useEffect(() => {
    axios
      .get('http://smart.techpanda.art/newpatient/')
      .then(response => {
        const filteredData = response.data.filter(
          // item => item.user === 2 && item.bookmark1 === true,
          item => item.bookmark1 === true,
        );
        setBookMarkedData(filteredData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const Item = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PatientDetails2', {patient: item})}
      style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Image source={item.image || images.personal1} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.name}>{item.fullname}</Text>
          <Text style={styles.dignosis}>Diagnosis: {item.dignosis1}</Text>
          <Text style={styles.dignosis}>Location: {item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={images.dashBg}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Bookmarked Cases</Text>
        </View>

        <View style={styles.container}>
          <FlatList
            data={bookMarkedData}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 64,
    marginHorizontal: 17,
  },
  backArrow: {
    width: 36,
    height: 36,
  },
  headerText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 1,
    color: '#150124',
    marginLeft: 10,
    marginTop: 5,
  },
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: '#10011C',
    backgroundColor: 'transparent',
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemTextContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.05,
    color: '#10011C',
  },
  dignosis: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.05,
    color: '#10011C',
    opacity: 0.75,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default BookedMark;
