import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../pages/ErrorPage";

const ErrorHandler = ({children}) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorHandler