import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomActionSheet = ({ isVisible, onBackdropPress, options, onCancel }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} style={{ margin: 0 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 10 }}>
        {options.map((option, index) => (
          <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={option.onPress}>
            <Text style={{ flex: 1 }}>{option.text}</Text>
            {option.hasArrow && <Icon name="chevron-forward" size={20} />}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={{ padding: 10 }} onPress={onCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomActionSheet;
