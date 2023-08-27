import React, { useContext } from 'react';
import { StyleSheet, InteractionManager, Platform, TouchableOpacity } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { AuthContext } from '../../screens/Auth/AuthScreen';
import { PhoneContainer, PhonePrefix } from '../../styles/authSteps';
import { COLORS } from '../../functions/constants';
import i18n from 'i18next';
import { CountryPicker } from 'react-native-country-picker-modal/lib/CountryPicker';
function PhoneNumber({ onPressPhoneNumber }) {
  const { data, handleChangeObject } = useContext(AuthContext);
  const [state, setState] = React.useState({});
  const [countryCode, setCountryCode] = React.useState('RU');
  const [country, setCountry] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [mask, setMask] = React.useState('999 999 99 99');
  const language = i18n.language === 'ru' ? 'rus' : 'common';

  const getMaskByCountryCode = (cca2) => {
    const masks = {
      AC: '9999',
      AD: '999 999',
      AE: '99 999 9999',
      AF: '99 999 9999',
      AG: '999 9999',
      AI: '999 9999',
      AL: '999999 999',
      AM: '99 999 999',
      AN: '999 9999',
      AN: '999 9999',
      AN: '999 9999',
      AO: '999999 999',
      AQ: '99 999',
      AR: '999999 9999',
      AS: '999 9999',
      AT: '999999 9999',
      AU: '9 9999 9999',
      AW: '999 9999',
      AZ: '99 999 99 99',
      BA: '99 99999',
      BA: '99 9999',
      BB: '999 9999',
      BD: '99 999 999',
      BE: '999999 999',
      BF: '99 99 9999',
      BG: '999999 999',
      BH: '9999 9999',
      BI: '99 99 9999',
      BJ: '99 99 9999',
      BM: '999 9999',
      BN: '999 9999',
      BO: '9 999 9999',
      BR: '999999 9999',
      BR: '99999 9999',
      BR: '999999 9999',
      BS: '999 9999',
      BT: '999 999',
      BT: '9 999 999',
      BW: '99 999 999',
      BY: '99999 99 99',
      BZ: '999 9999',
      CA: '999999 9999',
      CD: '999999 999',
      CF: '99 99 9999',
      CG: '99 999 9999',
      CH: '99 999 9999',
      CI: '99 999 999',
      CK: '99 999',
      CL: '9 9999 9999',
      CM: '9999 9999',
      CN: '9999999 9999',
      CN: '9999999 999',
      CN: '99 99999 99999',
      CO: '999999 9999',
      CR: '9999 9999',
      CU: '9 999 9999',
      CV: '99999 99',
      CW: '999 9999',
      CY: '99 999 999',
      CZ: '999999 999',
      DE: '9999999 9999',
      DE: '999999 9999',
      DE: '99999 9999',
      DE: '99999 999',
      DE: '99999 99',
      DE: '999 999',
      DJ: '99 99 99 99',
      DK: '99 99 99 99',
      DM: '999 9999',
      DO: '999 9999',
      DO: '999 9999',
      DO: '999 9999',
      DZ: '99 999 9999',
      EC: '99 999 9999',
      EC: '9 999 9999',
      EE: '9999 9999',
      EE: '999 9999',
      EG: '999999 9999',
      ER: '9 999 999',
      ES: '999999 999',
      ET: '99 999 9999',
      FI: '999999 99 99',
      FJ: '99 99999',
      FK: '99999',
      FM: '999 9999',
      FO: '999 999',
      FR: '99999 9999',
      FR: '999999 999',
      FR: '99 9999',
      FR: '999999 999',
      GA: '9 99 99 99',
      GD: '999 9999',
      GE: '999999 999',
      GF: '99999 9999',
      GH: '999999 999',
      GI: '999 99999',
      GL: '99 99 99',
      GM: '99999 99',
      GN: '99 999 999',
      GQ: '99 999 9999',
      GR: '999999 9999',
      GT: '9 999 9999',
      GU: '999 9999',
      GW: '9 999999',
      GY: '999 9999',
      HK: '9999 9999',
      HN: '9999 9999',
      HR: '99 999 999',
      HT: '99 99 9999',
      HU: '999999 999',
      ID: '99999 9999',
      ID: '99 999 99',
      ID: '99 999 999',
      ID: '99 999 9999',
      ID: '99999 999',
      ID: '99999 99 999',
      IE: '999999 999',
      IL: '9 999 9999',
      IL: '9 999 9999',
      IN: '9999999 999',
      IO: '999 9999',
      IQ: '999999 9999',
      IR: '999999 9999',
      IS: '999 9999',
      IT: '9999999 999',
      JM: '999 9999',
      JO: '9 9999 9999',
      JP: '99 9999 9999',
      JP: '999999 999',
      KE: '999 999999',
      KG: '999999 999',
      KH: '99 999 999',
      KI: '99 999',
      KM: '99 99999',
      KN: '999 9999',
      KP: '999 9999',
      KP: '99 999 999',
      KP: '999 9999 999',
      KP: '999 999',
      KP: '9999 9999',
      KP: '9999 9999999999999',
      KR: '99 999 9999',
      KW: '9999 9999',
      KY: '999 9999',
      KZ: '999 999 99 99',
      KZ: '999 999 99 99',
      LA: '9999 999 999',
      LA: '99 999 999',
      LB: '99 999 999',
      LB: '9 999 999',
      LC: '999 9999',
      LI: '999 999 9999',
      LK: '99 999 9999',
      LR: '99 999 999',
      LS: '9 999 9999',
      LT: '999 99 999',
      LU: '999 999 999',
      LV: '99 999 999',
      LY: '99 999 999',
      LY: '999 9999',
      MA: '99 9999 999',
      MC: '999 999 999',
      MC: '99 999 999',
      MD: '9999 9999',
      ME: '99 999 999',
      MG: '99 99 99999',
      MH: '999 9999',
      MK: '99 999 999',
      ML: '99 99 9999',
      MM: '99 999 999',
      MM: '9 999 999',
      MM: '999 999',
      MN: '99 99 9999',
      MO: '9999 9999',
      MP: '999 9999',
      MQ: '999 99 99 99',
      MR: '99 99 9999',
      MS: '999 9999',
      MT: '9999 9999',
      MU: '999 9999',
      MV: '999 9999',
      MW: '999 999',
      MW: '9 9999 9999',
      MX: '999 999 9999',
      MX: '99 99 9999',
      MY: '99 999 9999',
      MY: '999 999 999',
      MY: '99 999 999',
      MY: '9 999 999',
      MZ: '99 999 999',
      NA: '99 999 9999',
      NC: '99 9999',
      NE: '99 99 9999',
      NF: '99 999',
      NG: '999 999 9999',
      NG: '99 999 999',
      NG: '99 999 99',
      NG: '999 999 9999',
      NI: '9999 9999',
      NL: '99 999 9999',
      NO: '999 99 999',
      NP: '99 999 999',
      NR: '999 9999',
      NU: '9999',
      NZ: '999 999 999',
      NZ: '99 999 999',
      NZ: '999 999 9999',
      OM: '99 999 999',
      PA: '999 9999',
      PE: '999 999 999',
      PF: '99 99 99',
      PG: '999 99 999',
      PH: '999 999 9999',
      PK: '999 999 9999',
      PL: '999 999 999',
      PS: '99 999 9999',
      PT: '99 999 9999',
      PW: '999 9999',
      PY: '999 999 999',
      QA: '9999 9999',
      RE: '99999 9999',
      RO: '99 999 9999',
      RS: '99 999 9999',
      RU: '999 999 99 99',
      RW: '999 999 999',
      SA: '9999 9999',
      SA: '9 999 9999',
      SB: '999 9999',
      SB: '99999',
      SC: '9 999 999',
      SD: '99 999 9999',
      SE: '99 999 9999',
      SG: '9999 9999',
      SH: '9999',
      SH: '9999',
      SI: '99 999 999',
      SK: '999 999 999',
      SL: '99 999999',
      SM: '9999 999999',
      SN: '99 999 9999',
      SO: '99 999 999',
      SO: '9 999 999',
      SO: '9 999 999',
      SR: '999 9999',
      SR: '999 999',
      SS: '99 999 9999',
      ST: '99 99999',
      SV: '99 99 9999',
      SX: '999 9999',
      SY: '99 9999 999',
      SZ: '99 99 9999',
      TC: '999 9999',
      TD: '99 99 99 99',
      TG: '99 999 999',
      TH: '99 999 9999',
      TH: '99 999 999',
      TJ: '99 999 9999',
      TK: '9999',
      TL: '999 9999',
      TL: '999 99999',
      TL: '999 99999',
      TM: '9 999 9999',
      TN: '99 999 999',
      TO: '99999',
      TR: '999 999 9999',
      TT: '999 9999',
      TV: '9999',
      TV: '9999',
      TW: '9 9999 9999',
      TW: '9999 9999',
      TZ: '99 999 9999',
      UA: '99 999 99 99',
      UG: '999 999 999',
      UK: '99 9999 9999',
      US: '999 999 9999',
      UY: '9 999 99 99',
      UZ: '99 999 9999',
      VA: '99999',
      VC: '999 9999',
      VE: '999 999 9999',
      VG: '999 9999',
      VI: '999 9999',
      VN: '99 9999 999',
      VN: '999 9999 999',
      VU: '99 99999',
      VU: '99999',
      WF: '99 9999',
      WS: '99 9999',
      YE: '999 999 999',
      YE: '9 999 999',
      YE: '99 999 999',
      ZA: '99 999 9999',
      ZM: '99 999 9999',
      ZW: '9 999999',
    };
    return masks[cca2] || '999 999 99 99';
  };

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    handleChangeObject('countryCode', country ? country.callingCode[0] : '7');
    setVisible(false);
    setMask(getMaskByCountryCode(country.cca2));
  };

  const openModal = () => {
    setVisible(true);
  };

  React.useEffect(() => {
    if (Object.keys(state).length !== 0) {
      handleChangeObject('countryCode', country ? country.callingCode[0] : '7');
      InteractionManager.runAfterInteractions(() => {
        state.focus();
      });
    }
  }, [state]);

  return (
    <TouchableOpacity>
    <PhoneContainer>
        <CountryPicker
          {...{
            countryCode,
            onSelect,
            withCallingCode: true,
            translation: language,
            withFilter: true,
            visible,
            filterProps: {
              autoFocus: true,
              placeholder: i18n.t('enterCountry'),
              placeholderTextColor: '#000',
              style: {
                opacity: '50%',
                height: 40,
              },
            },
          }}
        />
      <PhonePrefix onPress={openModal} fz={Platform.OS === 'android' ? 27 : 30}>{country ? `+${country.callingCode}` : '+7'}</PhonePrefix>
      <MaskedTextInput
        mask={mask}
        ref={(input) => { setState(input); }}
        value={data?.phoneNumber}
        onChangeText={(text) => {
          handleChangeObject('phoneNumber', text);
        }}
        style={styles.input}
        keyboardType="numeric"
        autoFocus
        onFocus={onPressPhoneNumber}
        onBlur={onPressPhoneNumber}
      />
    </PhoneContainer>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Nunito',
    minWidth: 204,
    fontStyle: 'normal',
    height: 41,
    color: COLORS.black,
    fontWeight: '600',
    fontSize: Platform.OS === 'android' ? 27 : 30,
    display: 'flex',
    alignItems: 'center'
  },
});

export default PhoneNumber;
