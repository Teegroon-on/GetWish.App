import React from 'react';
import {
  Box, Image, Pressable, ScrollView, VStack
} from 'native-base';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../functions/constants';
import i18n from 'i18next';

function TutorialPosts({ setShowTutorial }) {
  const { height } = Dimensions.get('screen');
  const smallSmart = height <= 800;
  const language = i18n.language === 'ru' ? 'rus' : 'common';
  return (
    <Box zIndex={999999} style={{ elevation: 2 }} position="absolute" width="100%" height="100%" backgroundColor={COLORS.black3}>
      <ScrollView height="100%" width="100%">
        <VStack position="relative" height="100%" width="100%">
          <Pressable
            height="50px"
            width="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            top={smallSmart ? '1%' : "5%"}
            right="25px"
            position="absolute"
            onPress={async () => {
              await AsyncStorage.setItem(
               'showTutorialPosts',
               'true'
              );
              setShowTutorial(false);
             }}
          >
            <Image
              source={require('../../assets/images/icons/users/close.png')}
              height="18px"
              width="18px"
            />
          </Pressable>
          {language === 'rus' ? (
            <Image marginTop={smallSmart ? '10%' : '25%'} alignSelf="center" width="350px" height="541px" source={require('../../assets/images/icons/posts/tutorial_top.png')} />
          ) : (
            <Image marginTop={smallSmart ? '10%' : '25%'} alignSelf="center" width="350px" height="541px" source={require('../../assets/images/icons/posts/tutorialTopEng.png')} />
          )}
            <Pressable onPress={async () => {
                await AsyncStorage.setItem(
                    'showTutorialPosts',
                    'true'
                );
                setShowTutorial(false);
            }}>
              friend_plurals
            </Pressable>
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default TutorialPosts;
