import React from 'react';
import {
  Avatar, Box, HStack, Image, Pressable, Text, FlatList
} from 'native-base';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../functions/constants';
import { SharedButton } from '../../index';
import { cancelRequest, sendRequest } from '../../../redux/actions/userActions';
import { userCRUD } from '../../../http/CRUD';
import { changeUserInfo } from '../../../redux/actions/authActions';
import { goToUserProfile, toastConfig } from '../../../functions/helpers';
import {Alert} from "react-native";
import {useI18n} from "../../../i18n/i18n";

function ListFriendElement({
  data, add, handleSearchPanel, handlePress, first = false
}) {
  const { search } = useSelector((state) => state.user);
    const t = useI18n();

  const handleGoToUser = async (item) => {
    const user = await userCRUD.get(item?.id);
    await changeUserInfo('oneUser', user?.data);
    if (search) {
      await goToUserProfile();
      const close = await handleSearchPanel(false, true);
      await close(false);
    } else {
      await goToUserProfile({ noSearch: true });
    }
  };

  const handleMessageError = () => {
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
  }

  return (
    <FlatList
      style={{
        marginBottom: first ? 30 : 100,
        paddingLeft: 20,
        paddingRight: 20,
        flexGrow: first ? 0 : 1,
        zIndex: -1
      }}
      zIndex={9}
      data={data}
      renderItem={({
        item
      }) => (
        <Box
          _dark={{
            borderColor: 'gray.600'
          }}
          pb="20px"
          borderColor="coolGray.200"
        >
          <HStack space={3} alignItems="center">
            <Pressable onPress={() => handleGoToUser(item, add)} flex={1} display="flex" alignItems="center" flexDirection="row">
              <Avatar
                size="40px"
                source={item?.avatar ? {
                  uri: `${item?.avatar}`
                } : require('../../../assets/images/icons/profile/avatar.png')}
                marginRight="10px"
              />
              <Text
                color={COLORS.black}
                fontSize="14px"
                fontWeight="600"
              >
                {item.username}
              </Text>
            </Pressable>
            {item?.sendRequest ? (
              <SharedButton
                textStyle={{ fontSize: 14, lineHeight: 19 }}
                flex={false}
                onPress={() => cancelRequest(item.id)}
                style={{
                  width: 138, marginLeft: 'auto', maxWidth: 138, height: 30, fontWeight: 'bold'
                }}
              >
                {t('friends_cancel')}
              </SharedButton>
            ) : (
              <Pressable
                width="30px"
                height="30px"
                marginLeft="auto"
                onPress={handleMessageError}
              >
                <Image
                  resizeMode="contain"
                  width="21px"
                  height="24px"
                  source={add ? require('../../../assets/images/icons/friends/add.png') : require('../../../assets/images/icons/friends/chat.png')}
                />
              </Pressable>
            )}
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ListFriendElement;
