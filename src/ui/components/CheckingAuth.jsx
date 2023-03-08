import { CircularProgress, Grid } from '@mui/material';

//cuando se esta cargando la aplicacion se muestra un circulo de carga cuando el usuario se esta autenticando por google o por correo y contraseña
export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >

        <Grid container
            direction='row'
            justifyContent='center'
            >
            <CircularProgress color='warning' />
        </Grid>
    </Grid>
  )
}