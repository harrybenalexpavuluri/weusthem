import React, {useState, useEffect} from 'react';
import {Text, Button, View, TextInput} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ModifyContact = ({route, navigation}) => {
  const props = route.params
  const [fname, setFName] = useState(props.fname);
  const [lname, setLName] = useState(props.lname);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const id = props.id;

  
//   const [photo, setPhoto] = useState(null);

//   const handleChoosePhoto = () => {
//     await launchImageLibrary(options, (response) => {
//       // console.log(response);
//       if (response) {
//         setPhoto(response);
//       }
//     });
//   };

async function deleteContact() {
  await fetch('http://192.168.2.31:3001/contacts/delete', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({id})
    })
    .then(navigation.navigate('Home'))
    .then(async (res) => {
      const result = await res.json()
      console.log("Deleted")
      
    })}
  async function postContact() {
    await fetch('http://192.168.2.31:3001/contacts/update', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({id,newData:{ fname, lname, email, phone, id }})
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
        <TextInput placeholder="First name" value={fname} onChange={(e) => setFName(e.target.value)} />
        <TextInput placeholder="Last name" value={lname} onChange={(e) => setLName(e.target.value)} />
        <TextInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextInput placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Button onPress={postContact} title="Modify Contact" />
        <Button onPress={deleteContact} title="Delete Contact" />
      </View>
    </View>
  );
};

export default ModifyContact;