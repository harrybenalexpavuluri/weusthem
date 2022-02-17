import React, {useState} from 'react';
import {Text, Button, View, TextInput} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const AddContact = ({navigation}) => {
  const [fname, setFName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
//   const [photo, setPhoto] = useState(null);

//   const handleChoosePhoto = () => {
//     await launchImageLibrary(options, (response) => {
//       // console.log(response);
//       if (response) {
//         setPhoto(response);
//       }
//     });
//   };

  async function postContact() {
    await fetch('http://192.168.2.31:3001/contacts/add', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ fname, lname, email, phone })
      })
      .then(navigation.navigate('Home'))
      .then(async (res) => {
        const result = await res.json()
        console.log(result)
        
      })
       
    //   return response.json();
  }
  return (
    <View>
      <Text> Demo Form </Text>
      <View>
        {/* <Button title="Choose Photo" onPress={handleChoosePhoto} /> */}
        <TextInput placeholder="First name" onChange={(e) => setFName(e.target.value)} />
        <TextInput placeholder="Last name" onChange={(e) => setLName(e.target.value)} />
        <TextInput placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <TextInput placeholder="Phone number" onChange={(e) => setPhone(e.target.value)} />
        <Button onPress={postContact} title="Add Contact" />
      </View>
    </View>
  );
};

export default AddContact;