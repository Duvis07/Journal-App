import { collection, getDocs } from "firebase/firestore/lite";
import { Firebase_DB } from "../firebase/config";


//carga las notas del usuario en firestore
export const loadNotes = async (uid = "") => {
  if (!uid) throw new Error("El UID del usuario no existe");

  //hace referencia a la coleccion de notas del usuario hay que apuntar a la coleccion de notas del usuario
  const collectionRef = collection(Firebase_DB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  //se crea un arreglo de notas y se inserta un objeto con el id y el resto de los datos de la nota
  const notes = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });
  //se retorna el arreglo de notas
  return notes;
  
};
