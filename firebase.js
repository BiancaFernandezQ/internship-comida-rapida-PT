//! NOS CONECTAMOS CON FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

//! base de datos importamos
//importando funciones
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnIXMZLFE2_HQs16un1eHKx9dqhu212sg",
    authDomain: "prueba-tecnica-77434.firebaseapp.com",
    projectId: "prueba-tecnica-77434",
    storageBucket: "prueba-tecnica-77434.appspot.com",
    messagingSenderId: "900665263894",
    appId: "1:900665263894:web:bf0a8767a0a91d62e93237"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(); //conexion a la base de datos

//!creando funciones para guardar GUARDANDO DATOS EN LA BD
export const savePlatillo = (nombre, precio, descripcion, categoria, ingredientes) => {
    addDoc(collection(db, "platillos"), { nombre, precio, descripcion, categoria, ingredientes })
}

//! creando funcion para LISTAR/extraer LOS DATOS
export const getPlatillos = () =>
    getDocs(collection(db, 'platillos')); //coleccion platillos

export const onGetPlatillos = (callback) => onSnapshot(collection(db, 'platillos'), callback);

// !ELIMINANDO platillo
export const deletePlatillos = (id) => deleteDoc(doc(db, 'platillos', id)); //llamamos un solo dato

export const getPlatillo = id => getDoc(doc(db, 'platillos', id))

//! EDITAR y actualizar platillo
export const updatePlatillo = (id, newFields) => updateDoc(doc(db, 'platillos', id), newFields);

