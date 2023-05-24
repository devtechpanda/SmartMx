import React from 'react';
import {View, Button} from 'react-native';
import axios from 'axios';

const DeleteComponent = () => {
  const id = 140; // Specify the ID here

  const handleDelete = () => {
    axios
      .delete(`http://smart.techpanda.art/newpatient/${id}/`)
      .then(() => {
        // Data deleted successfully
        console.log('Data deleted');
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting data:', error);
      });
  };

  return (
    <View>
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

export default DeleteComponent;
