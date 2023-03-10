

export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningúna archivo a subir');

    //es la url de la api de cloudinary para subir imagenes a la nube
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dprdqx7y2/upload';

    //se crea un objeto de tipo formdata para enviar los datos ala api de cloudinary
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file );

    //se hace un try catch para manejar los errores que se puedan presentar al subir la imagen a la nube de cloudinary 
    //se utliza el fetch api para hacer la peticion a la api de cloudinary y se envia el objeto de tipo formdata con los datos de la imagen
    try {
 
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });


        if ( !resp.ok ) throw new Error('No se pudo subir imagen')
        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }

}