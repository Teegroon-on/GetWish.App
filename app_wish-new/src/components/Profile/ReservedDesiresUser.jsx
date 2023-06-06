import React from 'react';
import {
  HStack, Image, Pressable, Text, Box
} from 'native-base';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Platform } from 'react-native';
import {
  ReservedDesiresUserContainer,
  ReservedDesiresUserSubTitle,
  ReservedDesiresUserTitle
} from '../../styles/profile';
import { declOfNum, goToUserWishLists } from '../../functions/helpers';
import { ActionSheets } from '../../functions/ActionSheet';
import { androidShadow } from '../../functions';
import {useI18n} from "../../i18n/i18n";

function ReservedDesiresUser({
  isInWishList, name, id, el, privateMode = false, archive
}) {

  const { showActionSheetWithOptions } = useActionSheet();
  const t = useI18n()
  const state = new ActionSheets(t, showActionSheetWithOptions);

  function RenderImage(wish) {
    if (wish) {
      if (wish?.image) {
        return <Image borderRadius={10} size={68} source={{ uri: wish?.image }} />;
      }
      return <Image borderRadius={10} size={68} source={require('../../assets/images/icons/wishlist/noPhoto.png')} />;
    }
    return <Image borderRadius={10} size={68} source={require('../../assets/images/icons/profile/desires/placeholder.png')} />;
  }

  return (
    <Pressable
      shadow={1}
      onPress={async () => {
        goToUserWishLists({ id });
      }}
    >
      <ReservedDesiresUserContainer
        style={Platform.OS === 'android' && androidShadow}
      >
        <Image
          source={el?.theme?.card ? { uri: el?.theme?.card } : require('../../assets/images/icons/users/theme.png')}
          alt="background"
          style={{position: "absolute", width: "108%", height: "126%", resizeMode: "cover", borderRadius: "10px"}}
        />
        <HStack justifyContent="space-between" width="100%">
          <ReservedDesiresUserTitle>
            <Text>{el?.theme?.symbol || '🎄'}</Text>
            {' '}
            {name || t('newYear')}
          </ReservedDesiresUserTitle>
          <Pressable
            onPress={() => {
              if (!isInWishList) {
                state.showShareAction();
              } else {
                state.showShareActionInMyWishList(id, el, privateMode, archive);
              }
            }}
            height="20px"
            justifyContent="center"
            alignItems="center"
            width="20px"
          >
            <Image source={require('../../assets/images/icons/profile/desires/menu.png')} height="15px" width="3px" />
          </Pressable>
        </HStack>
        <ReservedDesiresUserSubTitle>
          {el?.wishes?.length}
          {' '}
          {declOfNum(
            el?.wishes?.length,
            t('desires_desirePlurals', {returnObjects: true})
          )}
        </ReservedDesiresUserSubTitle>
        <HStack marginTop="15px" space={3} justifyContent="center">
          {RenderImage(el?.wishes[0])}
          {RenderImage(el?.wishes[1])}
          {RenderImage(el?.wishes[2])}
          {RenderImage(el?.wishes[3])}
        </HStack>
      </ReservedDesiresUserContainer>
    </Pressable>
  );
}


export default ReservedDesiresUser;
