import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const getItems = async (userId) => {
  const items = [];
  const itemsCollection = collection(db, "users", userId, "items");
  const itemsQuery = query(itemsCollection);
  const querySnapshot = await getDocs(itemsQuery);

  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return items;
};

export const addItem = async (userId, item) => {
  const itemsCollection = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollection, item);

  return docRef.id;
};
