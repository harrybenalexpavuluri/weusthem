import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, FlatList, TouchableHighlight, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNRestart from 'react-native-restart';

export default function Home({navigation}) {

  let [contacts, setContacts] = React.useState('')
  let [activeContact, setActiveContact] = React.useState('')
  useEffect(() => {
    getContacts()
  }, [contacts])
  const getContacts = React.useCallback(() => {
    fetch('http://192.168.2.31:3001/contacts')
      .then((response) => response.json())
      .then((json) => {
        if(json.contacts != contacts) setContacts(json.contacts)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  React.useEffect(() => {
    getContacts()
  }, [getContacts])

  const handleClick = (id) => {
    setActiveContact(id)
    Alert.alert(
      "Contact Options",
      "What action would you like to perform?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteContact(id),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  }

  const deleteContact = (id) => {
    fetch('http://192.168.0.110:3001/contacts/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contactId: activeContact
      })
    })
      .then(() => {
        // make a copy of current notes
        const newContact = [...contacts]

        // filter out note that is being deleted
        const filtered = newContacts.filter(({ id }) => {
          return id !== activeContact
        })

        // set filtered array as new state
        setContacts(filtered)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>


      <View style={styles.description}>
        <Text style={{ textAlign: "center" }}>Click here to add new contact</Text>
        <TouchableOpacity
          onPress={() =>  navigation.navigate('AddContact')}>
          <Ionicons
            name={'md-add'}
            size={30}
            style={{ margin: 3 }}
            color={'green'}
          />
        </TouchableOpacity>
      </View>

        
      <FlatList
        data={contacts}
        renderItem={({ item }) =>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            key={item.id}
            onPress={() => navigation.navigate('ModifyContact', item)}>
            <View key={item.id} style={styles.task}>
              <Text>{item.fname}</Text>
            </View>
          </TouchableHighlight>
        }
        keyExtractor={(item, index) => index.toString()}
      />
      
    </View>
  );
}

Home.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  task: {
    marginVertical: 4,
    marginHorizontal: 8,
    backgroundColor: 'yellow',
    paddingHorizontal: 6,
    paddingVertical: 15
  },
  container: {
    flex: 1,
    display: "flex"
  },
  description: {
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
  }
});
