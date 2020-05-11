/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Realm from 'realm';
 
const CarSchema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};
const PersonSchema = {
  name: 'Person',
  properties: {
    name:     'string',
    birthday: 'date',
    cars:     'Car[]', // a list of Cars
    picture:  'data?'  // optional property
  }
};

const UserScheme = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    age: 'int',
  }
};

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {

  // #1
  // Realm.open({schema: [CarSchema, PersonSchema]})
  //   .then(realm => {
  //     // Create Realm objects and write to local storage
  //     // realm.write(() => {
  //     //   const myCar = realm.create('Car', {
  //     //     make: 'Honda',
  //     //     model: 'Civic',
  //     //     miles: 1000,
  //     //   });
  //     //   myCar.miles += 20; // Update a property value
  //     // });
  //     // Query Realm for all cars with a high mileage
  //     const cars = realm.objects('Car').filtered('miles > 1000');
  //     console.log({ cars: realm.objects('Car').map(x => Object.assign({}, x)) });
  //     // Remember to close the realm when finished.
  //     realm.close();
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  // #2
  // Realm.open({
  //   schema: [{name: 'User', properties: {name: 'string', age: 'int'}}]
  // }).then(realm => {
  //   realm.write(() => {
  //     realm.create('Dog', {name: 'Rex'});
  //     realm.create('User', {name: 'Wadah', age: 10})
  //   });
  //   console.log({ users: realm.objects('User').length });
  // });

  // #3
  Realm.open({schema: [UserScheme]})
    .then(realm => {
      console.log(`Adding Users`);
      realm.write(() => {
        const newUser = realm.create('User', {
          id: 1,
          name: "Wadah",
          age: 24
        })
        newUser.age += 1;
      });

      realm.write(() => {
        realm.create('User', {
          id: 2,
          name: "Aiham",
          age: 24
        })
      });

      realm.write(() => {
        realm.create('User', {
          id: 3,
          name: "Ahmed",
          age: 24
        })
      });

      console.log({ users: realm.objects('User').map(x => Object.assign({}, x)) }); 
      const userByID = realm.objects('User').find(user => user.id == 1);
      console.log({ userByID });

      console.log(`Modifying Users With id more than 1`)
      realm.write(() => {
        realm.objects('User').filter(user => user.id > 1).forEach(user => {
          user.name = `${user.name} (Edited)`
        });
      });
      console.log({ users: realm.objects('User').map(x => Object.assign({}, x)) }); 

      console.log(`Deleting Use with name Aiham (Edited)`)
      realm.write(() => {
        const Aiham = realm.objects('User').find(user => user.name === 'Aiham (Edited)');
        realm.delete(Aiham)
      });
      console.log({ users: realm.objects('User').map(x => Object.assign({}, x)) }); 
    })
    .catch(error => {
      console.log(error);
    });

  // Deletes all the database
  Realm.deleteFile({ scheme: [UserScheme]});


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: "100%"
          }}>
          <Text>Open Console</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
