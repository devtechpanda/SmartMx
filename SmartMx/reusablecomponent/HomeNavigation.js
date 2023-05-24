import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import { icons } from '../constant';

const HomeNavigation = ({ navigation }) => {
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('home')}>
        <ImageBackground
          source={icons.home}
          style={{
            width: 100,
            height: 100,
          }}>
          <Text style={styles.text}>Home</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('pWorkSpace')}>
        <ImageBackground
          source={icons.pWorkSpace}
          style={{
            width: 100,
            height: 100,
          }}></ImageBackground>
        <Text style={styles.text}>Personal Workspace</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UWorkSpace')}>
        <ImageBackground
          source={icons.UWorkSpace}
          style={{
            width: 100,
            height: 100,
          }}>
          <Text style={styles.text}>{'     '}Unit Workspace</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('BookMarked')}>
        <ImageBackground
          source={icons.bookMark}
          style={{
            width: 100,
            height: 100,
          }}>
          <Text style={styles.text}>Bookmarked Cases</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0.5,
    color: '#10011C',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 90,
  },
});
