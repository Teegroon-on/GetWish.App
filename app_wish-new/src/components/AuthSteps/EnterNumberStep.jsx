import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthStep from './AuthStep';
import { PhoneNumber } from '../index';
import { TextOffer, TextOfferPurple } from '../../styles/authSteps';
import AuthButton from '../Shared/AuthButton';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import { sendCode } from '../../redux/actions/authActions';
import {useI18n} from "../../i18n/i18n";
import {Platform} from "react-native";
import {COLORS} from "../../functions/constants";
import {KeyboardAvoidingView} from "native-base";
import {NavigationActions as navigation} from "react-navigation";

function EnterNumberStep({ isChangePhone }) {
  const { data, onNextStep } = useContext(AuthContext);
  console.log(data);
  const onPressNumberStep = async () => {
    const phoneNumber = data.phoneNumber.split(' ').join('');
    if (phoneNumber.length >= 10) {
      console.log(`${data.countryCode}${phoneNumber}`);
     const t = await sendCode(`${data.countryCode}${phoneNumber}`);
      console.log(t);
      onNextStep();
    }
  };

  const t = useI18n()

  const disabledNext = data.phoneNumber.split(' ').join('').length < 10;
  const tosText = t('auth_tos', { returnObjects: true })

  return (
      <KeyboardAvoidingView
          behavior={'none'}
          style={{ backgroundColor: COLORS.white, flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
    <AuthStep isFirstStep isChangePhone={isChangePhone} mt={isChangePhone ? 44 : 136} maxWidth={266}
              text={t('auth_codeWillBeSent')}
              title={t('auth_enterPhoneTitle')}>
      <PhoneNumber />
      {!isChangePhone && (
      <TextOffer>
          {tosText[0]}
        <TextOfferPurple>
            {tosText[1]}
        </TextOfferPurple>
      </TextOffer>
      )}
      <AuthButton
        style={{ marginTop: isChangePhone ? 100 : 0 }}
        onPress={onPressNumberStep}
        active={!disabledNext}
      >
          {t('auth_getCode')}
      </AuthButton>
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
