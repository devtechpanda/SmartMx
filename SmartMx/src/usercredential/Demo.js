import React, {useState} from 'react';
import {View, Button} from 'react-native';

const MyComponent = () => {
  const [isDPLoading, setIsDPLoading] = useState(false);

  const apiid = 24;

  const handleDPSendRequest = async () => {
    setIsDPLoading(true);

    try {
      const response = await fetch('https://smart.techpanda.art/image/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: apiid,
        }),
      });

      if (response.ok) {
        // Request was successful
        console.log('Request sent successfully');
      } else {
        // Request failed
        console.log('Request failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }

    setIsDPLoading(false);
  };

  return (
    <View>
      <Button
        title={isDPLoading ? 'Sending...' : 'Send'}
        onPress={handleDPSendRequest}
        disabled={isDPLoading}
      />
    </View>
  );
};

export default MyComponent;
