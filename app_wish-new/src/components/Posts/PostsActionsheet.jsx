import React, { useEffect, useState } from 'react';
import {
  Actionsheet, Box, Radio, Text
} from 'native-base';
import Toast from 'react-native-toast-message';
import {
  ActionDesires,
} from '../../styles/profile';
import { COLORS } from '../../functions/constants';
import AuthButton from '../Shared/AuthButton';
import { useI18n } from '../../i18n/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PostsActionsheet() {
  const [open, setOpen] = useState(false);

  const t = useI18n();
  const firstText = t('add_post_text');
  const secondText = t('add_post_second_text');
  const buttonText = t('understandable');
  const createPost = t('createPostText');

  const handleClose = async () => {
    await AsyncStorage.setItem('popUpAddPost', 'false');
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('popUpAddPost');
      if (result !== 'false') {
        setOpen(true);
      }
    };

    fetchData();
  }, []);

  return (
    <Actionsheet
      zIndex={998}
      padding={0}
      isOpen={open}
      position="relative"
      onClose={handleClose}
    >
      <Actionsheet.Content zIndex={998} style={{ elevation: 0 }} padding={0} backgroundColor="#fff">
        <ActionDesires style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 30 }}>
          <Text textAlign="center" fontFamily="NunitoBold" fontSize={18} color={COLORS.black}>{createPost}</Text>
          <Text
            fontSize={14}
            color={COLORS.gray}
            marginTop="10px"
            textAlign="center"
          >
            {firstText}
          </Text>
          <Text alignSelf="center" maxWidth="335px" fontSize={14} color={COLORS.gray} marginTop="10px" textAlign="center">
            {secondText}
          </Text>
          <AuthButton
            style={{ marginTop: 25, alignSelf: 'center' }}
            active
            onPress={handleClose}
          >
            {buttonText}
          </AuthButton>
        </ActionDesires>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default PostsActionsheet;
