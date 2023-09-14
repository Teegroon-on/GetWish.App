import React from 'react';
import {
  Box,
  Image, Spinner, Text, View
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { WishListContainer, WishListPrivateText } from '../../styles/wishlist';
import ChooseTheme from './Add/ChooseTheme';
import { COLORS } from '../../functions/constants';
import InputText from '../../components/Inputs/InputText';
import { ProfilePrivateText } from '../../styles/profile';
import {
  FormGroupContainer, FormGroupElementSwitch, FormGroupSwitch, FormGroupTextSwitch
} from '../../styles/shared';
import AuthButton from '../../components/Shared/AuthButton';
import {
  goBack, goToShareScreen, goToUserWishLists, goToWishList
} from '../../functions/helpers';
import { ListFriendsMinus, Loader } from '../../components';
import { getFriends } from '../../redux/actions/userActions';
import useLoader from '../../hooks/useLoader';
import { HANDLE_DELETED_SELECTED_FRIENDS, HANDLE_SELECTED_FRIENDS } from '../../redux/constants/wishListConstants';
import { createWishList, getThemes } from '../../redux/actions/wishListActions';
import { wishlistCRUD } from '../../http/CRUD';
import { reload } from '../../redux/actions/genericActions';
import { setWishListAdded } from '../../redux/actions/wishActions';
import { useI18n } from '../../i18n/i18n';

function AddWishList({ navigation, ...props }) {
  const { start, stop, loading } = useLoader(false);
  const { start: start2, stop: stop2, loading: loading2 } = useLoader(false);
  const [active, setActive] = React.useState(1);
  const [name, setName] = React.useState('');
  const [archive, setArchive] = React.useState(false);
  const [privateWishList, setPrivate] = React.useState(false);
  const { selectedFriends, themes } = useSelector((state) => state.wishList);
  const { addedWishId } = useSelector((state) => state.wish);
  const [selectedFriendsLocal, setSelectedFriendsLocal] = React.useState([]);
  const dispatch = useDispatch();
  const t = useI18n();
  const id = React.useMemo(() => props?.route?.params?.id, [props?.route?.params?.id]);
  const isEdit = !!id;

  React.useEffect(() => {
    (async function () {
      start2();
      try {
        const theme = await getThemes();
        setActive(theme[0]?.id);
        if (isEdit) {
          const { data } = await wishlistCRUD.get(id);
          setName(data?.name);
          setPrivate(data?.private);
          setArchive(data?.is_archive);
          setActive(data?.theme?.id);
          if (data?.private) {
            dispatch({
              type: HANDLE_SELECTED_FRIENDS,
              payload: data?.friends.map((el) => el.id)
            });
          }
        }
      } finally {
        stop2();
      }
    }());
  }, [isEdit]);

  const parent = navigation.getParent();

  React.useEffect(() => {
    parent.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      if (!addedWishId) parent.setOptions({ tabBarStyle: { display: 'flex' } });
      dispatch({
        type: HANDLE_SELECTED_FRIENDS,
        payload: []
      });
    };
  }, []);

  const handleChangeSwitch = () => {
    setPrivate((prevState) => !prevState);
  };

  const handleAddWishLists = async () => {
    if (canNext) {
      if (isEdit) {
        await wishlistCRUD.edit(id, {
          name,
          theme: active,
          is_archive: archive,
          private: privateWishList,
          friends: privateWishList ? selectedFriendsLocal?.map((el) => el.id) : []
        }).then(() => {
          reload();
          parent.setOptions({ tabBarStyle: { display: 'flex' } });
          goToUserWishLists({ id, backToWish: true });
          Toast.show({
            type: 'search',
            text1: t('changesSaveText'),
            position: 'bottom',
            bottomOffset: 95
          });
        });
      } else {
        await createWishList({
          name,
          theme: active,
          privateMode: privateWishList,
          friends: privateWishList ? selectedFriendsLocal?.map((el) => el.id) : []
        }).then((response) => {
          if (addedWishId) {
            setWishListAdded(response?.id);
            goBack();
          } else {
            goToUserWishLists({ id: response?.id, backToWish: true });
            parent.setOptions({ tabBarStyle: { display: 'flex' } });
          }
        });
      }

    }
  };

  const goToShareScreenHandle = () => {
    goToShareScreen({
      chooseFriend: true
    });
  };

  const screenHeight = Dimensions.get('window').height;

  const deleteFriendFromLocalHandler = (id) => {
    dispatch({
      type: HANDLE_DELETED_SELECTED_FRIENDS,
      payload: id
    });
    setSelectedFriendsLocal((prevState) => [...prevState.filter((el) => el.id !== id)]);
  };

  React.useEffect(() => {
    (async function () {
      if (selectedFriends.length) {
        start();
        try {
          const friends = await getFriends();
          let result = [];
          friends?.data.forEach((v) => {
            if (selectedFriends?.length) {
              if (selectedFriends?.includes(v.id)) {
                result.push(v);
              }
            }

          });
          setSelectedFriendsLocal(result);
        } finally {
          stop();
        }
      }
    }());
  }, [selectedFriends, selectedFriends.length, start, stop]);

  const canNext = React.useMemo(() => {
    if (name.length) {
      if (privateWishList) {
        return true;
      }
      return true;

    }
    return false;
  }, [name, privateWishList, selectedFriendsLocal]);

  return (
    <View style={{ Height: 'auto', maxHeight: screenHeight, flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        style={{ backgroundColor: COLORS.white, maxHeight: '85%', }}
        contentContainerStyle={{
          flexGrow: 1, minHeight: '85%', display: 'flex', flexDirection: 'column'
        }}
      >
        {loading2 ? (
          <Loader />
        ) : (
          <WishListContainer style={{ alignItems: 'center' }}>
            <Text alignSelf="flex-start" mt="20px" fontSize={15}>{t('themeText')}</Text>
            <ChooseTheme themes={themes} active={active} setActive={setActive} />
            <Text textAlign="center" color={COLORS.gray} fontSize={12}>{t('yourWishListDisplay')}</Text>
            {active && (
            <Image
              alignSelf="center"
              marginTop="16px"
              width="260px"
              height="138px"
              source={{ uri: themes?.find((el) => el.id === active)?.preview }}
            />
            )}
            <InputText value={name} onChange={setName} marginBottom="20px" marginTop="30px" />
            <FormGroupContainer lst={0}>
              <FormGroupElementSwitch>
                <FormGroupTextSwitch>{t('privateWish')}</FormGroupTextSwitch>
                <FormGroupSwitch
                  thumbColor="#fff"
                  value={privateWishList}
                  onChange={handleChangeSwitch}
                  trackColor={{ false: '#D4DAEC', true: '#8424FF' }}
                  ios_backgroundColor="#D4DAEC"
                />
              </FormGroupElementSwitch>
            </FormGroupContainer>
            <ProfilePrivateText>
              {t('privateText')}
            </ProfilePrivateText>
            {loading ? <Spinner /> : privateWishList && (
            <View width="100%" paddingTop={30}>
              <View width="100%" flexDirection="row" display="flex" height="22px" justifyContent="space-between">
                <Text width="110px" fontSize={14}>
                  {selectedFriends?.length ? t('availableFor') : t('availableWho')}
                  :
                </Text>
                <TouchableOpacity
                  onPress={goToShareScreenHandle}
                  width="66px"
                  activeOpacity={1}
                  underlayColor="none"
                >
                  <Text
                    fontSize={15}
                    color={COLORS.purple}
                    fontFamily="NunitoBold"
                  >
                    {t('select')}
                  </Text>
                </TouchableOpacity>
              </View>
              {selectedFriends?.length ? (
                <ListFriendsMinus
                  deleteFriendFromLocalHandler={deleteFriendFromLocalHandler}
                  data={selectedFriendsLocal}
                />
              ) : (
                <WishListPrivateText>
                  {t('addFriendsText')}
                </WishListPrivateText>
              )}
            </View>
            )}
          </WishListContainer>
        )}
      </KeyboardAwareScrollView>
      <Box alignItems="center" height="15%" pt="20px" width="100%" backgroundColor={COLORS.white2}>
        <AuthButton onPress={handleAddWishLists} active={canNext}>
          {isEdit ? t('saveChanges') : t('done')}
        </AuthButton>
      </Box>
    </View>
  );
}

export default AddWishList;
