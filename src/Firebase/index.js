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
export const fetchEmployeeHomeData = async () => {
  const doc = await db
    .collection('Employees')
    .doc('48qVcSNDDsbAUNZbWbm4pBU792h1')
    .get();
  return doc.data();
};

// WellTesting functions
export const fetchPools = async () => {
  const snapshot = await db.collection('Pool').get();
  return snapshot;
};

export default firebase;
