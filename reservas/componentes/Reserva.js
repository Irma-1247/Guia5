import React from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';
const Reserva = ({item, eliminarPersona}) => {
  const dialogoEliminar = id => {
    console.log('eliminando....', id);
    eliminarPersona(id);
  };
  return (
    <View style={styles.reserva}>
      <View>
        <Text style={styles.label}>Nombre: </Text>
        <Text style={styles.texto}>{item.nombre}</Text>
      </View>
      <View>
        <Text style={styles.label}>Fecha: </Text>
        <Text style={styles.texto}>{item.fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora: </Text>
        <Text style={styles.texto}>{item.hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Cantidad de personas: </Text>
        <Text style={styles.texto}>{item.cantidad}</Text>
      </View>
      <View>
        <Text style={styles.label}>Zona: </Text>
        <Text style={styles.texto}>{item.seccion}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}> Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  reserva: {
    backgroundColor: '#FFF',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 5,
    color: 'black',
  },
  texto: {
    fontSize: 17,
    color: '#404040',
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 20,
    width: 150,
  },
  textoEliminar: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Reserva;
