import styled from 'styled-components/native/dist/styled-components.native.esm';

export const AuthStepContainer = styled.View`
  padding: 0 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  flex: 1;
  font-family: 'Nunito';
`;

export const AuthStepHeader = styled.View`
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.jc};
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => (props.mb ? props.mb : 48)}px;
`;

export const ExitImage = styled.Image`
    align-self: flex-end;
  width: 76px;
  height: 26px;
`;

export const HeaderTouchableHighlight = styled.TouchableHighlight`
  align-self: flex-end;
  width: 76px;
  height: 26px;
`;

export const AuthStepContent = styled.View`
  display: flex;
  align-items: center;
  height: 100%;
  padding-top: ${(props) => props.mt}px;
`;

export const AuthStepCancelText = styled.Text`
  font-family: 'Nunito';
  font-weight: 600;
  font-size: 16px;
  color: #8424FF;

`;

export const AuthStepContentHeader = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${(props) => props.mw}px;
`;

export const AuthStepContentHeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  line-height: 27.28px;
  color: #1A1A1A;
  text-align: center;
`;

export const AuthStepContentHeaderText = styled.Text`
  margin-top: 7px;
  color: #7C82A5;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
`;

export const PhoneContainer = styled.View`
  margin-top: 69px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
`;

export const PhonePrefix = styled.Text`
  color: #1A1A1A;
  font-size: ${(props) => props.fz}px;
  margin-right: 6px;
`;

export const TextOffer = styled.Text`
  font-family: 'Nunito';
  align-self: center;
  font-weight: 300;
  font-size: 12px;
  color: #7C82A5;
  max-width: 312px;
  margin-top: 119px;
  text-align: center;
  margin-bottom: 20px;
`;

export const TextOfferPurple = styled.Text`
  color: #8424FF;
  font-family: 'Nunito';
  font-size: 12px;
  font-weight: 400;
`;

export const AvailableCharactersTextPurple = styled.Text`
  color: #8424FF;
  font-family: 'Nunito';
  font-size: 13px;
  font-weight: 800;
`;

export const Codes = styled.View`
  margin-top: 73px;
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`;

export const CodeElement = styled.View`
    position: relative;
      display: flex;
      flex-direction: column;
      height: 31px;
      width: 30px;
`;

export const CodePlaceholder = styled.View`
      position: absolute;
      align-self: center;
      align-content: center;
      left: 10px;
      top: 10px;
      border-radius: 30px;
      background: ${(props) => props.error || '#D4DAEC'};
      height: 10px;
      width: 10px;
`;

export const EnterCodeStepBottom = styled.View`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    margin-top: auto;
`;

export const EnterNickNameStepContainer = styled.View`
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 272px;
`;

export const ChangeNicknameP1 = styled.Text`
  font-family: 'Nunito';
  font-size: 13px;
  line-height: 18px;
  max-width: 335px;
  color: #7C82A5;
  margin-top: 20px;

`;

export const ChangeNicknameP2 = styled.Text`
  font-family: 'Nunito';
  font-size: 13px;
  line-height: 18px;
  max-width: 335px;
  color: #7C82A5;
  margin-top: 10px;

`;

export const ChangeNicknamePurple = styled.Text`
  font-family: 'Nunito';
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  color: #8424FF;

`;

export const EnterNickNameInfo = styled.Text`
  font-family: 'Nunito';
    max-width: 325px;
    align-self: center;
    text-align: center;
    font-size: 13px;
    color: #7C82A5;
    margin-bottom: 20px;
`;

export const CodeTextError = styled.Text`
  margin-top: 41px;
  font-family: 'Nunito';
  font-size: 14px;
  line-height: 19px;
  color: #FF3D54;
  text-align: center;
  align-self: center;
`;

export const TimerContainer = styled.View`
    margin-top: 112px;
    display: flex;
    font-family: 'Nunito';
    flex-direction: row;
    align-items: center;
    width: 199px;
    height: 21px;
`;
export const TimerTexts = styled.Text`
  font-family: 'Nunito';
  font-weight: bold; 
  font-size: 15px;
  color: #D4DAEC;
`;

export const TimerTextSendAgain = styled.Text`
  font-family: 'Nunito';
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  align-self: center; 
  width: 100%;
  color: #8424FF;
  text-align: center;
`;

export const TimerNumber = styled.Text`
  font-family: 'Nunito';
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-left: 14px;
  color: #1A1A1A;
`;
