import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const Demo = () => {
  //-------------usestate
  const [fullname, setFullname] = useState('shyam');
  const [location, setLocation] = useState('hyderabad');
  const [gender, setGender] = useState('male');
  const [dignosis1, setDignosis1] = useState(['shyam', 'reddy']);
  const [discharged, setDischarged] = useState('discharged');
  const [investigationplaned, setInvestigationplaned] = useState('22');
  const [treatmentplan, setTreatmentplan] = useState('23');
  const [status, setStatus] = useState(true);
  const [bookmark1, setBookmark1] = useState(false);
  const [comment, setComment] = useState('not comments');
  const [user, setUser] = useState(2);
  const [grp, setGrp] = useState(2);
  const [upload, setUpload] = useState('');

  const handlePostData = async () => {
    try {
      const fileUri = upload;

      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('location', location);
      formData.append('gender', gender);
      formData.append('dignosis1', JSON.stringify(dignosis1));
      formData.append('discharged', discharged);
      formData.append('investigationplaned', investigationplaned);
      formData.append('treatmentplan', treatmentplan);
      formData.append('status', status);
      formData.append('bookmark1', bookmark1);
      formData.append('comment', comment);
      formData.append('user', user);
      formData.append('grp', grp);
      formData.append('upload', {
        uri: fileUri,
        name: 'image.jpg',
        type: 'image/jpeg', // Modify the type according to your image file type
      });

      fetch('http://smart.techpanda.art/newpatient/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          Alert.alert('Data Added Successfully');
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (err) {
      console.log('Error while reading the file:', err);
    }
  };

  const selectDoc = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setUpload(res.uri);
      console.log('Selected image:', res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload');
      else console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Document Picker for Image</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={selectDoc}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {upload ? (
          <Image style={styles.image} source={{uri: upload}} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handlePostData}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    color: 'black',
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 40,
  },
  buttonContainer: {
    marginHorizontal: 40,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6D21A9',
    borderRadius: 10,
    height: 63,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#6D21A9',
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.05,
    color: '#ffffff',
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  placeholderText: {
    color: 'grey',
  },
  saveButton: {
    marginBottom: 30,
    backgroundColor: '#6D21A9',
    borderRadius: 10,
    height: 63,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#6D21A9',
    flexDirection: 'row',
  },
  saveButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: 0.05,
    color: '#ffffff',
    marginLeft: 5,
  },
});
