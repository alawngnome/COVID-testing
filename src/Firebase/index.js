import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAiDAKXW2D7ntfkoGioXoDY8cI4O-frdaI',
  authDomain: 'covid-testing-9eff5.firebaseapp.com',
  databaseURL: 'https://covid-testing-9eff5.firebaseio.com',
  projectId: 'covid-testing-9eff5',
  storageBucket: 'covid-testing-9eff5.appspot.com',
  messagingSenderId: '890832674459',
  appId: '1:890832674459:web:7d547b7becf6a5f2b6f03e',
  measurementId: 'G-SPS6WRXRJJ',
};

firebase.initializeApp(firebaseConfig);
firebase.auth();

let db = firebase.firestore();

// EEHome functions
export const fetchEmployeeHomeData = async (uid) => {
  //console.log('the id in index.js is ' + firebase.auth().currentUser.uid);
  const doc = await db
    .collection('Employees')
    .doc(uid) //(firebase.auth().currentUser.uid)
    .get();
  //console.log('the id is ' + firebase.auth().currentUser.uid);
  return doc.data();
};

//Fetch All Employees
export const fetchEmployees = async () => {
  const snapshot = await db.collection('Employees').get();
  return snapshot;
};

// WellTesting functions
export const fetchPools = async () => {
  const snapshot = await db.collection('Pool').get();
  return snapshot;
};

export default firebase;
