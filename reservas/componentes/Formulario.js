import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
import colors from '../src/utils/colors';
import RNPickerSelect from 'react-native-picker-select/src';

const Formulario = ({
  reservas,
  setReservas,
  guardarMostrarForm,
  guardarReservasStorage,
}) => {
  //variables para el formulario
  const [nombre, guardarNombre] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [cantidad, guardarCantidad] = useState('');
  const [seccion, guardarSeccion] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const confirmarFecha = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };
  // Muestra u oculta el Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const confirmarHora = hour => {
    const opciones = {hour: 'numeric', minute: '2-digit', hour12: false};
    guardarHora(hour.toLocaleString('es-ES', opciones));
    hideTimePicker();
  };
  // Crear nueva cita
  const crearNuevaReserva = () => {
    // Validar
    if (
      nombre.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      cantidad.trim() === '' ||
      seccion.trim() === ''
    ) {
      // Falla la validación
      mostrarAlerta();
      return;
    }
    // Crear una nueva cita
    const reserva = {nombre, fecha, hora, cantidad, seccion};
    reserva.id = shortid.generate();
    // Agregar al state
    const reservasNuevo = [...reservas, reserva];
    setReservas(reservasNuevo);
    // Pasar las nuevas citas a storage
    guardarReservasStorage(JSON.stringify(reservasNuevo));
    // Ocultar el formulario
    guardarMostrarForm(false);
    // Resetear el formulario
    guardarNombre('');
    guardarFecha('');
    guardarHora('');
    guardarCantidad('');
    guardarSeccion('');
  };
  // Muestra la alerta si falla la validación
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', // Titulo
      'Todos los campos son obligatorios', // mensaje
      [
        {
          text: 'OK', // Arreglo de botones
        },
      ],
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarNombre(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige la fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una Hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <Text style={styles.label}>Cantidad de personas:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarCantidad(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Seleccione zona:</Text>
          <RNPickerSelect
            onValueChange={value => guardarSeccion(value)}
            items={[
              {label: 'Fumadores', value: 'Fumadores'},
              {label: 'No fumadores', value: 'No fumadores'},
            ]}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => crearNuevaReserva()}
            style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Guardar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#F2A75C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  zona: {
    height: 50,
    width: 150,
  },
});
export default Formulario;
