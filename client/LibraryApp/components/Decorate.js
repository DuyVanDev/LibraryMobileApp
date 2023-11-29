import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { colors } from '../constants/theme';
const Decorate = () => {
  const list = ['Tending', 'Sci-fi', 'Psychology'];
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
         gap : 12
      }}>
      {list.map((item, index) => {
        return (
          <TouchableOpacity
            style={{borderWidth: 1, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, flex: 1,borderColor : "white"}}
            key={index}>
            <Text style={{textAlign: 'center', color: colors.textColor}}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Decorate;
