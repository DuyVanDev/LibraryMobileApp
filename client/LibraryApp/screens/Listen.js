import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import Slider from '@react-native-community/slider';
import AudioHelper from '../helpers/AudioHelper';
import {colors} from '../constants/theme';
const Listen = ({navigation, route}) => {
  const {product} = route.params;

  // const [valueTime, setValueTime] = useState(1);
  // const [playing, setPlaying] = useState(false);
  const player = AudioHelper({
    audio: 'https://www.bensound.com/bensound-music/bensound-anewbeginning.mp3',
  })
  const handleBack = () => {
    navigation.goBack();
  };

  let valueProgress = (100 * player.currentTime) / player.duration;
  let time = player.getCurrentTime(player.currentTime);
  let end = player.getCurrentTime(player.duration);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Entypo
            name="chevron-left"
            style={{
              fontSize: 18,
              color: colors.white,
              padding: 12,
              backgroundColor: colors.lightGray,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
        <View style={{flexGrow: 1}}>
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'center',
              color: colors.white,
              width: Dimensions.width,
            }}>
            {product.bookTitle}
          </Text>
        </View>
      </View>
      <View style={styles.thumnail}>
        <Image style={styles.imgThumnail} source={{uri: product.bookImage}} />
      </View>
      <View style={styles.containerBox}>
        <View style={{display : "flex", alignItems : "center", justifyContent :"space-between", flexDirection :"row"}}>
          <Text style={{color: 'white'}}>{time}</Text>

          <Text style={{color: 'white'}}>{end}</Text>
        </View>
        <Slider
          style={{width: Dimensions.width}}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={valueProgress}
          onValueChange={value => player.onValueChangeOfSlider(value)}
          onSlidingComplete={value => player.onSlidingCompleteOfSlider(value)}
        />
        <View style={styles.control}>
          <TouchableOpacity onPress={player.prevBtn}>
          <FontAwesome6 style={styles.iconControll} name="arrow-rotate-left" />
          </TouchableOpacity>
          {player.status == 'play' ? (
            <TouchableOpacity
              style={styles.buttonPlayPause}
              onPress={player.pause}>
              <FontAwesome6
                style={{...styles.iconControll, fontSize: 24}}
                name="pause"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonPlayPause}
              onPress={player.playTrack}>
              <FontAwesome6
                style={{...styles.iconControll, fontSize: 24}}
                name="play"
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={player.nextBtn}>
          <FontAwesome6 style={styles.iconControll} name="arrow-rotate-right" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View
          style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
          {player.status == 'play' ? (
            <Button
              onPress={player.pause}
              style={{marginHorizontal: 20}}
              title="a"
            />
          ) : (
            <Button
              onPress={player.playTrack}
              style={{marginHorizontal: 20}}
              title="b"
            />
          )}
          <Text style={{color: 'white'}}>{time}</Text>

          <Text style={{color: 'white'}}>{end}</Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            value={valueProgress}
            onValueChange={value => player.onValueChangeOfSlider(value)}
            onSlidingComplete={value => player.onSlidingCompleteOfSlider(value)}
          />
        </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingVertical: 8,
  },
  thumnail: {
    width: Dimensions.width,
    height: 400,
    borderRadius: 30,
    marginTop: 30
  },
  imgThumnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 30,
  },
  containerBox: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal : 20
  },
  control: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 50,
  },
  buttonPlayPause: {
    backgroundColor: colors.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconControll: {
    fontSize: 20,
    color: colors.white,
  },
  playBtn: {
    padding: 20,
  },
});

export default Listen;
