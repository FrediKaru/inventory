import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig";

import {
  addDoc,
  getDocs,
  setDoc,
  doc,
  getDoc,
  collection,
  getFirestore,
} from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const productsRef = collection(db, "products");

export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  return products;
}

export async function getProduct(id: number) {
  const docRef = doc(db, "products", id.toString());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Product data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such product!");
    return null;
  }
}

export async function saveProduct(id, formData) {
  try {
    await setDoc(doc(productsRef, id), {
      ...formData,
    });
    console.log("Product saved successfully");
  } catch (e) {
    console.log("Saving is not available for product id:", id);
    console.log("Error", e);
  }
}

const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

export async function setSampleProducts() {
  try {
    await setDoc(doc(productsRef, "201"), {
      name: "BMFL WashBeam",
      manufacturer: "Robe",
      cost: 16000,
      type: "Wash",
      weight: 36.9, // in kilograms
      powerConsumption: 1700, // in watts
    });

    await setDoc(doc(productsRef, "202"), {
      name: "SolaFrame 750",
      manufacturer: "High End Systems",
      cost: 13000,
      type: "Framing Spot",
      weight: 27.2, // in kilograms
      powerConsumption: 600, // in watts
    });

    await setDoc(doc(productsRef, "203"), {
      name: "Astera Titan Tube",
      manufacturer: "Astera",
      cost: 9500,
      type: "LED Tube",
      weight: 1.35, // in kilograms
      powerConsumption: 72, // in watts
    });

    await setDoc(doc(productsRef, "204"), {
      name: "Astera AX5 TriplePAR",
      manufacturer: "Astera",
      cost: 12000,
      type: "PAR Light",
      weight: 2.3, // in kilograms
      powerConsumption: 45, // in watts
    });

    await setDoc(doc(productsRef, "205"), {
      name: "Luxibel B P9",
      manufacturer: "Luxibel",
      cost: 8000,
      type: "LED Wash",
      weight: 11.5, // in kilograms
      powerConsumption: 480, // in watts
    });

    await setDoc(doc(productsRef, "206"), {
      name: "Robe MegaPointe",
      manufacturer: "Robe",
      cost: 15000,
      type: "Beam/Spot",
      weight: 22.0, // in kilograms
      powerConsumption: 1050, // in watts
    });

    await setDoc(doc(productsRef, "207"), {
      name: "Luxibel B EXPO200",
      manufacturer: "Luxibel",
      cost: 7000,
      type: "Expo Light",
      weight: 8.7, // in kilograms
      powerConsumption: 220, // in watts
    });

    await setDoc(doc(productsRef, "208"), {
      name: "SolaWash 1000",
      manufacturer: "High End Systems",
      cost: 14000,
      type: "Wash",
      weight: 29.5, // in kilograms
      powerConsumption: 1200, // in watts
    });

    await setDoc(doc(productsRef, "209"), {
      name: "Robe T1 Profile",
      manufacturer: "Robe",
      cost: 17000,
      type: "Framing Spot",
      weight: 24.8, // in kilograms
      powerConsumption: 1100, // in watts
    });

    await setDoc(doc(productsRef, "210"), {
      name: "Astera Helios Tube",
      manufacturer: "Astera",
      cost: 8500,
      type: "LED Tube",
      weight: 0.95, // in kilograms
      powerConsumption: 48, // in watts
    });

    await setDoc(doc(productsRef, "211"), {
      name: "Luxibel B P16",
      manufacturer: "Luxibel",
      cost: 10500,
      type: "LED Wash",
      weight: 15.0, // in kilograms
      powerConsumption: 600, // in watts
    });
  } catch (e) {
    console.log("error is", e);
  }
  return;
}