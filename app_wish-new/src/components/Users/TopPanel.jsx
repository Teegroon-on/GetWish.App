import React from 'react';
import {
  Avatar, Box, Button, HStack, Image, Text
} from 'native-base';
import { useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Toast from 'react-native-toast-message';
import { TopPanelContainer } from '../../styles/users';
import {
  SharedButton
} from '../index';
import { COLORS } from '../../functions/constants';
import AuthButton from '../Shared/AuthButton';
import {acceptFriendProfile, cancelRequest, deleteFriend, sendRequest} from '../../redux/actions/userActions';
import {useI18n} from "../../i18n/i18n";
import {declOfNum} from "../../functions/helpers";
import {Alert} from "react-native";

function TopPanel() {
  const { oneUser } = useSelector((state) => state.user);
  const { showActionSheetWithOptions } = useActionSheet();
  const t = useI18n()

  const deleteFriendHandler = () => {
    return showActionSheetWithOptions({
      options: [
          t('cancel'),
        t('friends_delete_friend')
      ],
      cancelButtonIndex: 0,
      destructiveButtonIndex: 1,
      title: t('friends_youAreFriends'),
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        await deleteFriend(oneUser?.id);
      }
    });
  };


  const sendMessageButton = () => {
    const alertTitle = t('alertTitle');
    const alertMessage = t('alertMessage');
    Alert.alert(
        alertTitle,
        alertMessage,
          [
            { text: 'OK'}
          ],
          { cancelable: false }
      );
  };

  const cancelSendRequest = () => {
    return showActionSheetWithOptions({
      options: [t('cancel'), t('friends_cancels')],
      cancelButtonIndex: 0,
      destructiveButtonIndex: 1,
      title: t('friends_request_was_sent'),
      userInterfaceStyle: 'dark'
    }, async (buttonIndex) => {
      if (buttonIndex === 1) {
        await cancelRequest(oneUser?.id, 'PROFILE');
      }
    });
  };

  return (
    <TopPanelContainer>
      <HStack space={3} alignItems="center" marginBottom={15}>
        <Avatar
          bg="#C4C4C4"
          size="64px"
          source={oneUser?.avatar ? { uri: `${oneUser?.avatar}` } : require('../../assets/images/icons/profile/avatar.png')}
        />
        <HStack alignItems="center">
          <Box paddingRight="22.5px" paddingLeft="22.5px">
            <Text fontSize={15} fontWeight="bold" textAlign="center">{oneUser?.friends}</Text>
            <Text fontSize={13} textAlign="center">{declOfNum(oneUser?.friends, [t('friend_plurals'), t('friend_plurals1'), t('friend_plurals2')])}</Text>
          </Box>
          <Box paddingRight="22.5px" paddingLeft="22.5px">
            <Text fontSize={15} fontWeight="bold" textAlign="center">{oneUser?.posts}</Text>
            <Text fontSize={13} textAlign="center">{declOfNum(oneUser?.posts, [t('desires_Posts'), t('desires_Posts2'), t('desires_Posts3')])}</Text>
          </Box>
          <Box paddingRight="22.5px" paddingLeft="22.5px">
            <Text fontSize={15} fontWeight="bold" textAlign="center">{oneUser?.wishes}</Text>
            <Text fontSize={13} textAlign="center">{declOfNum(oneUser?.wishes, [t('desires_desirePlurals1'), t('desires_desirePlurals2'), t('desires_desirePlurals3')])}</Text>
          </Box>
        </HStack>
      </HStack>
      {!oneUser?.is_friend && !oneUser?.has_outgoing_friend_request && !oneUser?.has_incoming_friend_request && (
      <SharedButton
        onPress={() => sendRequest(oneUser?.id, 'PROFILE').then(() => {
          Toast.show({
            type: 'search',
            text1: t('friends_request_was_sent'),
            position: 'bottom',
            bottomOffset: 95,
          });
        })}
        textStyle={{ fontSize: 15, lineHeight: 21 }}
        flex={false}
        style={{
          width: '100%', maxWidth: 335, height: 36
        }}
      >
        {t('friends_add_friend')}
      </SharedButton>
      )}
      {!oneUser?.is_friend && oneUser?.has_incoming_friend_request && (
      <SharedButton
        onPress={() => acceptFriendProfile(oneUser?.id).then(() => {
          Toast.show({
            type: 'search',
            text1: t('friendAddToFriend'),
            position: 'bottom',
            bottomOffset: 95,
          });
        })}
        textStyle={{ fontSize: 15, lineHeight: 21 }}
        flex={false}
        style={{
          width: '100%', maxWidth: 335, height: 36
        }}
      >
        {t('addFriendRequestText')}
      </SharedButton>
      )}
      {oneUser?.has_outgoing_friend_request && !oneUser?.is_friend && (
      <SharedButton
        onPress={cancelSendRequest}
        color={COLORS.gray}
        textStyle={{ fontSize: 15, lineHeight: 21 }}
        flex={false}
        style={{
          width: '100%', maxWidth: 335, height: 36
        }}
      >
        {t('requestSending')}
      </SharedButton>
      )}
      {oneUser?.is_friend && (
        <Box width="100%" maxWidth={335} justifyContent="space-between" flexDirection="row">
          <Button
            style={{
              backgroundColor: COLORS.white,
              height: 36,
              width: 162,
              maxWidth: 162,
              borderRadius: 10,
              flex: 1
            }}
            _text={{
              color: COLORS.gray,
              fontSize: 15,
              lineHeight: 18
            }}
            onPress={deleteFriendHandler}
            leftIcon={<Image size="12px" source={require('../../assets/images/icons/users/check.png')} />}
          >
            {t('friends_youAreFriends')}
          </Button>
          <AuthButton
            higlightStyle={{ height: 36 }}
            lineHeightText={36}
            style={{
              height: 36,
              width: 162,
              maxWidth: 162,
              borderRadius: 10,
            }}
            variant="small"
            text={t('profile_sendMessage')}
            onPress={sendMessageButton}
          />
        </Box>

      )}

    </TopPanelContainer>
  );
}

export default TopPanel;
