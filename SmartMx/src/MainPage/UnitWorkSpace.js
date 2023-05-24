import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {icons} from '../../constant';
import TextButton from '../../reusablecomponent/TextButton';
import InputField from '../../reusablecomponent/InputField';

const UnitWorkSpace = ({navigation, route}) => {
  const userData = route.params.res;
  const [showModal, setShowModal] = useState(false);
  const [group, setGroup] = useState('');
  const [groupData, setGroupData] = useState([]);

  // const [groupDataId, setGroupDataId] = useState();

  console.log('KSSR', group);
  useEffect(() => {
    fetchGroupData();
  }, []);

  const addGroup = async () => {
    try {
      // Check if the group already exists
      const existingGroup = groupData.find(item => item.group === group);
      if (existingGroup) {
        Alert.alert('Error', 'Group already exists with the same name');
        return;
      }

      const response = await axios.post(
        'http://smart.techpanda.art/newgroup/',
        {
          group: group,
        },
      );

      // Fetch the updated group data from the API
      await fetchGroupData();

      setGroup('');
      setShowModal(false);
      Alert.alert('Success', 'Data sent to API successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGroupData = async () => {
    try {
      const response = await axios.get('http://smart.techpanda.art/newgroup/');
      setGroupData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderGroupItem = ({item}) => (
    <View style={{marginTop: 25}}>
      <TouchableOpacity
        style={{
          backgroundColor: '#6D21A9',
          borderRadius: 8,
          padding: 17,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
        }}
        onPress={() => {
          navigation.navigate('UnitA', {
            res: userData,
            grpId: item.id,
            grpName: item.group,
          });
          console.log(item);
        }}>
        <Text style={{color: '#ffffff', fontSize: 16, fontWeight: 'bold'}}>
          {item.group}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.arrowBack} />
          </TouchableOpacity>
          <Text style={styles.heading}>Unit Workspace</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('pWorkSpace', {res: userData})}
            style={[styles.buttonPersonal, {backgroundColor: '#FFFFFF'}]}>
            <Text style={styles.buttonTextPersonal}>Personal Workspace</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UWorkSpace', {userData: userData})
            }
            style={[styles.buttonPersonal, {marginLeft: -40}]}>
            <Text style={[styles.buttonTextPersonal, {color: '#FFFFFF'}]}>
              Unit Workspace
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.groupContainer}>
          <Text style={styles.title}>My Groups</Text>

          <FlatList
            data={groupData}
            renderItem={renderGroupItem}
            keyExtractor={item =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            style={{height: 350, marginBottom: 30, marginTop: 20}}
            showsVerticalScrollIndicator={false}
          />

          <View style={{marginBottom: 20, marginTop: 22}}>
            <TextButton
              title="New group"
              bgColor="#6D21A9"
              color="#ffffff"
              icon={icons.plus}
              onPress={() => setShowModal(true)}
            />
          </View>
        </View>
      </View>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalInputContainer}>
              <InputField
                placeholder="Enter group name"
                icon={icons.people}
                name="group"
                value={group}
                onChange={setGroup}
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <TextButton
                title="Done"
                bgColor="#6D21A9"
                color="#ffffff"
                onPress={addGroup}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UnitWorkSpace;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    marginTop: 64,
    marginHorizontal: 17,
  },
  arrowBack: {
    width: 36,
    height: 36,
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 1,
    color: '#150124',
    marginLeft: 10,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonPersonal: {
    backgroundColor: '#6D21A9',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 5,
  },
  buttonTextPersonal: {
    color: '#6D21A9',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  groupContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.05,
    color: '#150124',
    marginTop: 30,
  },
  groupScrollView: {
    marginTop: 10,
  },
  groupItem: {
    marginTop: 20,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000AA',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalInputContainer: {
    marginTop: 20,
  },
  modalButtonContainer: {
    marginTop: 30,
  },
});
