import { createSlice } from "@reduxjs/toolkit";


//S hace crud de las notas
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // }
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },

        //se crea una nota vacia o una nueva entrada
        addNewEmptyNote: (state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },

        //se mira la nota activa
        setActiveNote: (state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },

        //se cargan las notas en el state
        setNotes: (state, action ) => {
            state.notes = action.payload;
        },

        //se guarda la nota en el state
        setSaving: (state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        //se actualiza la nota en el state en la referencia local de la app
        //el map recorre el arreglo de notas y si la nota que se esta recorriendo es igual a la nota que se esta actualizando
        //se actualiza la nota y se retorna la nota actualizada y si no se retorna la nota que se esta recorriendo en el map
        updateNote: (state, action ) => { // payload: note
            state.isSaving = false;
            state.notes = state.notes.map( note => {

                if ( note.id === action.payload.id ) {
                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
        },

        //se agregan las fotos a la nota activa
        //va mantener las fotos que ya tiene la nota y le va a agregar las nuevas fotos que se le pasan por parametro
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ]; 
            state.isSaving = false;
        },

        //se limpia el state de las notas y la nota activa cuando se hace logout de la app 
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        //se borra la nota por id de la nota
        deleteNoteById: (state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById, 
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;