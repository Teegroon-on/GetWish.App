import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {Platform, Linking, View} from 'react-native';
import { KeyboardAvoidingView } from 'native-base';
import AuthStep from './AuthStep';
import { PhoneNumber } from '../index';
import { TextOffer, TextOfferPurple } from '../../styles/authSteps';
import AuthButton from '../Shared/AuthButton';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import { sendCode } from '../../redux/actions/authActions';
import { useI18n } from '../../i18n/i18n';
import { COLORS } from '../../functions/constants';

function EnterNumberStep({ isChangePhone }) {
  const { data, onNextStep } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [isBlocked, setIsBlocked] = React.useState(false);
  const onPressNumberStep = async () => {
    if (isBlocked) {
      return;
    }

    setIsBlocked(true);
    setLoading(true);
    const phoneNumber = data.phoneNumber.split(' ').join('');
    const t = await sendCode(`+${data.countryCode}${phoneNumber}`);
    onNextStep();
    setLoading(false);
    setTimeout(() => setIsBlocked(false), 500);
  };

  const t = useI18n();

  const disabledNext = data.phoneNumber.split(' ').join('').length < 3;
  const tosText = t('auth_tos', { returnObjects: true });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: COLORS.white, flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <AuthStep
        isFirstStep
        isChangePhone={isChangePhone}
        mt={isChangePhone ? 44 : 136}
        maxWidth={266}
        text={t('auth_codeWillBeSent')}
        title={t('auth_enterPhoneTitle')}
      >
        <PhoneNumber />
        <View
          style={{
            position: 'absolute',
            bottom: 31
          }}
        >
          {!isChangePhone && (
            <TextOffer onPress={() => Linking.openURL('https://doc-hosting.flycricket.io/getwish-privacy-policy/c947c99a-cbcb-4b82-ac58-878c67012c3e/privacy')}>
              {tosText[0]}
              <TextOfferPurple>
                {tosText[1]}
              </TextOfferPurple>
              {tosText[2]}
              <TextOfferPurple>
                {tosText[3]}
              </TextOfferPurple>
            </TextOffer>
          )}
          <AuthButton
            loading={loading}
            style={{ marginTop: isChangePhone ? 100 : 0 }}
            onPress={onPressNumberStep}
            active={!disabledNext && !loading && !isBlocked}
          >
            {t('auth_getCode')}
          </AuthButton>
        </View>
      </AuthStep>
    </KeyboardAvoidingView>
  );
}

EnterNumberStep.propTypes = {
  isChangePhone: PropTypes.bool,
};

EnterNumberStep.defaultProps = {
  isChangePhone: false,
};

export default EnterNumberStep;
