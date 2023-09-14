import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import { Animated, Platform, TouchableOpacity } from 'react-native';
import {
  HeaderArchive,
  HeaderArrow,
  HeaderArrowMore,
  HeaderAvatar,
  HeaderPressable, HeaderPressableArchive,
  HeaderPressableAvatar,
  HeaderPressableMore,
  HeaderRow,
  HeaderTitle
} from '../../styles/shared';
import { searchPanelHandler } from '../../redux/actions/genericActions';
import { goToArchive } from '../../functions/helpers';
import { COLORS } from '../../functions/constants';
import { useI18n } from '../../i18n/i18n';

function Header({
  navigation, title, more, morePress, avatar, nextHandler,
  search, archive, cancel = true, cancelText, backHandler, nextDisabled
}) {
  const { route } = navigation;
  const t = useI18n();
  const goBack = async () => {
    if (search && !route.params?.noSearch) {
      await searchPanelHandler(true);
      navigation.navigation.goBack();
    } else {
      navigation?.hasOwnProperty('goBack') ? navigation.goBack() : navigation.navigation.goBack();
    }
  };

  const handlePressable = async () => {
    if (backHandler) {
      backHandler();
    } else {
      await goBack();
    }
  };

  const [fadeAnim] = React.useState(new Animated.Value(0.7));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  }, []);

  return (
    <HeaderRow
        platform={Platform.OS === 'ios'}
      style={{
        opacity: fadeAnim,
      }}
      animation="fadeIn"
      as={Animated.View}
    >
      {cancel && (
      <HeaderPressable onPress={handlePressable}>
        <HeaderArrow source={require('../../assets/images/icons/arrow.png')} />
      </HeaderPressable>
      )}
      {cancelText && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 19,
            bottom: 10
          }}
          onPress={handlePressable}
          activeOpacity={1}
          underlayColor="none"
        >
          <Text
            color={COLORS.purple}
            fontSize={16}
            fontWeight={600}
          >
            {t('cancel')}
          </Text>
        </TouchableOpacity>
      )}
      <HeaderTitle numberOfLines={1}>{title}</HeaderTitle>
      {more && (
      <HeaderPressableMore onPress={morePress}>
        <HeaderArrowMore source={require('../../assets/images/icons/header/more.png')} />
      </HeaderPressableMore>
      )}
      {avatar && (
        <HeaderPressableAvatar>
          <HeaderAvatar source={require('../../assets/images/icons/profile/avatar.png')} />
        </HeaderPressableAvatar>
      )}
      {archive && (
      <HeaderPressableArchive onPress={goToArchive}>
        <HeaderArchive source={require('../../assets/images/icons/wishlist/archive.png')} />
      </HeaderPressableArchive>
      )}
      {nextHandler && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            bottom: 10
          }}
          onPress={nextHandler}
          activeOpacity={1}
          underlayColor="none"
        >
          <Text
            color={nextDisabled ? COLORS.extralightGray4 : COLORS.purple}
            fontSize={16}
            fontWeight={600}
          >
            {t('nextButtonText')}
          </Text>
        </TouchableOpacity>
      )}
    </HeaderRow>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
