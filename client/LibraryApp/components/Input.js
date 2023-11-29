import React, { memo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput  } from 'react-native-paper';
import {debounce} from "lodash"
const Input = ({text}) => {
  // adding state for the value
  const [value, setValue] = useState();

  const onChange = (e) => {setValue(e.target.value)};
  const debouncedOnChange = debounce(onChange, 500);
  console.log(value)

  // turning input into controlled component by passing value from state there
  return <TextInput onChange={debouncedOnChange} value={value} />
}

export default memo(Input);