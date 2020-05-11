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

import React from 'react';
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

  //     console.log({ cars });
  //     // Will return a Results object with our 1 car
  //     cars.length // => 1

  //     // Add another car
  //     realm.write(() => {
  //       const myCar = realm.create('Car', {
  //         make: 'Ford',
  //         model: 'Focus',
  //         miles: 2000,
  //       });
  //     });

  //     // Query results are updated in realtime
  //     cars.length // => 2

  //     // Remember to close the realm when finished.
  //     realm.close();
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  

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
