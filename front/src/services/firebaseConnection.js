import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDDblKxFeBYavYXD27TDZXkAV1Shva2rj0",
    authDomain: "sistema-28fa3.firebaseapp.com",
    projectId: "sistema-28fa3",
    storageBucket: "sistema-28fa3.appspot.com",
    messagingSenderId: "18637175644",
    appId: "1:18637175644:web:b053171ee7a65e2cb41f99",
    measurementId: "G-MJ0K1WSN48"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)
   export{db, auth, storage}

