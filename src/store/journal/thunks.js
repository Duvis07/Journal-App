import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { Firebase_DB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";

import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";

//empieza a guardar la nota
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(Firebase_DB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    //! dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

//empieza a cargar las notas que el usuario tiene en la base de datos
export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

//empieza a guardar la nota  y la actualiza en la base de datos
export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    //la nota que le voy a enviar a la base de datos de firestore
    //se elimina el id porque no se puede enviar ala base de datos
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(Firebase_DB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  };
};

//recibe un arreglo de archivos y los sube a cloudinary y retorna un arreglo de urls de las imagenes
//fileUploadPromises es un arreglo de promesas que se van a ejecutar en paralelo y se espera a que todas se resuelvan para continuar con el codigo de la funcion
//se utliza un for of para recorrer el arreglo de archivos y se va a ir agregando a fileUploadPromises una promesa por cada archivo
export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    // await fileUpload( files[0] );

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(Firebase_DB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
