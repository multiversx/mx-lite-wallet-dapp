import { CreateDisclaimerScreen } from './components';
import { CreateDisclaimerPropsType, useCreateDisclaimer } from './hooks';

export const CreateDisclaimer = (props: CreateDisclaimerPropsType) => {
  const {
    handleNetworkCheckboxChange,
    handleCheckboxChange,
    disclaimerContinueHandler,
    isValid,
    touched,
    safetyRef,
    networkRef,
    touchedNetwork,
    isValidNetwork
  } = useCreateDisclaimer(props);

  return (
    <CreateDisclaimerScreen
      disclaimerContinueHandler={disclaimerContinueHandler}
      handleCheckboxChange={handleCheckboxChange}
      handleNetworkCheckboxChange={handleNetworkCheckboxChange}
      isValid={isValid}
      isValidNetwork={isValidNetwork}
      networkRef={networkRef}
      safetyRef={safetyRef}
      touched={touched}
      touchedNetwork={touchedNetwork}
    />
  );
};
