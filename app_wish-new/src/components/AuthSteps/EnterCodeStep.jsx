import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View, Text, TouchableWithoutFeedback } from 'react-native';
import AuthStep from './AuthStep';
import AuthButton from '../Shared/AuthButton';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import {
  CodeElement,
  CodePlaceholder,
  Codes,
  CodeTextError,
  EnterCodeStepBottom,
  EnterCodeStepContainer
} from '../../styles/authSteps';
import EnterCodeStepTimer from './EnterCodeStepTimer';
import { checkCode } from '../../redux/actions/authActions';
import { navigateAction } from '../../functions/NavigationService';
import useToasts from '../../hooks/useToast';
import { updatePhone } from '../../redux/actions/userActions';
import { COLORS } from '../../functions/constants';
import {useI18n} from "../../i18n/i18n";

function EnterCodeStep({ isChangePhone }) {
  const {
    data, handleChangeObject, onNextStep, step
  } = React.useContext(AuthContext);
  const t = useI18n();
  const { show } = useToasts(2000, t('profile_phoneChanged'));
  const [codes, setCodes] = React.useState('');
  const [numberPress, setNumberPress] = React.useState(false);

  const numberClick = () => {
    if (!numberPress) {
      setNumberPress(true);
    } else {
      setNumberPress(false);
    }
  };
  const handleChange = (text) => {
    if (text.length <= 4) {
      setCodes(text);
      if (text.length === 4) {
        handleChangeObject('codes', text);
      }
    }
  };

  const [error, setError] = React.useState(false);
  const textInputRef = useRef(null);

  let disabledNext = true;

  if (codes.length === 4) {
    disabledNext = false;
  }

  const clearCode = () => {
    setCodes('');
    setError(true);
  };

  const onPressCodeStep = async () => {
    const phoneNumber = data.phoneNumber.split(' ').join('');
    if (!disabledNext) {
      if (isChangePhone) {
        await updatePhone(`+${data.countryCode}${phoneNumber}`, codes).then(async () => {
          navigateAction('MainProfile');
          show();
        }).catch(() => {
          clearCode();
        });
      } else {
        await checkCode(`+${data.countryCode}${phoneNumber}`, codes).then(async () => {
          onNextStep();
        }).catch(() => {
          clearCode();
        });
      }
    }
  };

  const styles = StyleSheet.create({
    inputStyle: {
      backgroundColor: 'transparent',
      fontSize: 60,
      position: 'absolute',
      color: '#ffffff',
      width: '100%',
      paddingLeft: 5,
      height: '100%',
      fontWeight: '600',
    },
    codeBox: {
      fontFamily: 'Nunito',
      fontWeight: '600',
      color: COLORS.black,
      fontSize: 27,
      width: 30,
      height: 30,
      paddingLeft: 5,
      marginTop: 0,
      textAlign: 'center',
    },
  });

  return (
    <AuthStep back mt={44} maxWidth={276} text={t('auth_codeWasSend')} title={`+${data.countryCode} ${data.phoneNumber}`}>
      <EnterCodeStepContainer>
        <TouchableWithoutFeedback onPress={() => textInputRef.current.focus()}>
          <Codes>
            <TextInput
              ref={textInputRef}
              onChangeText={handleChange}
              value={codes}
              maxLength={4}
              keyboardType="numeric"
              style={styles.inputStyle}
              autoFocus
              onFocus={numberClick}
              onBlur={numberClick}
              caretHidden
            />
            {[0, 1, 2, 3].map((index) => (
              <CodeElement key={index}>
                {!codes[index] && <CodePlaceholder error={error && '#FFDEDE'} />}
                <Text style={styles.codeBox}>
                  {codes[index] || ""}
                </Text>
              </CodeElement>
            ))}
          </Codes>
        </TouchableWithoutFeedback>
        {error && <CodeTextError>{t('auth_errorInvalidCode')}</CodeTextError>}
        <EnterCodeStepBottom
          style={!numberPress ? { marginTop: '75%' } : { marginTop: -25 }}
        >
          <EnterCodeStepTimer />
          <AuthButton
            onPress={onPressCodeStep}
            active={!disabledNext}
          >
            {t('confirm')}
          </AuthButton>
        </EnterCodeStepBottom>
      </EnterCodeStepContainer>
    </AuthStep>
  );
}

EnterCodeStep.propTypes = {
  isChangePhone: PropTypes.bool,
};

EnterCodeStep.defaultProps = {
  isChangePhone: false,
};

export default EnterCodeStep;
