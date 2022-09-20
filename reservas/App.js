import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import Reserva from './componentes/Reserva';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './src/utils/colors';
const App = () => {
  // definir el state de citas
  const [reservas, setReservas] = useState([]);
  const [mostrarform, guardarMostrarForm] = useState(false);
  useEffect(() => {
    const obtenerReservasStorage = async () => {
      try {
        const reservasStorage = await AsyncStorage.getItem('reservas');
        if (reservasStorage) {
          setReservas(JSON.parse(reservasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerReservasStorage();
  }, []);
  // Elimina los pacientes del state
  const eliminarPersona = id => {
    const reservasFiltradas = reservas.filter(reserva => reserva.id !== id);
    setReservas(reservasFiltradas);
    guardarReservasStorage(JSON.stringify(reservasFiltradas));
  };
  // Muestra u oculta el Formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
  };
  // Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };
  // Almacenar las citas en storage
  const guardarReservasStorage = async reservasJSON => {
    try {
      await AsyncStorage.setItem('reservas', reservasJSON);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Historial de Reservas</Text>
        <View style={styles.let}>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>
              <Image
                style={styles.foto}
                source={require('./src/img/restaurant-2-fill.png')}
              />{' '}
              {mostrarform ? 'Cancelar' : 'Crear reservación'}{' '}
              <Image
                style={styles.foto}
                source={require('./src/img/restaurant-2-fill.png')}
              />
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarform ? (
            <>
              <Text style={styles.titulo}>Crear nueva reservación</Text>
              <Formulario
                reservas={reservas}
                setReservas={setReservas}
                guardarMostrarForm={guardarMostrarForm}
                guardarReservasStorage={guardarReservasStorage}
              />
            </>
          ) : (
            <>
              <Text style={styles.subtitulo}>
                {' '}
                {reservas.length > 0
                  ? 'Historial de reservas'
                  : 'No hay reservas'}{' '}
              </Text>
              <FlatList
                style={styles.listado}
                data={reservas}
                renderItem={({item}) => (
                  <Reserva item={item} eliminarPersona={eliminarPersona} />
                )}
                keyExtractor={reserva => reserva.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: Colors.PRIMARY_COLOR,
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    margin: 20,
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: Colors.BUTTON_COLOR,
    marginVertical: 10,
    width: 250,
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 9,
  },
  foto: {
    width: 25,
    height: 25,
  },
  let: {
    alignItems: 'center',
    borderRadius: 8,
  },
});
export default App;
