import styled from 'styled-components';

const Container=styled.div`
margin:auto;
padding:2rem;
text-align: center;
font-size: 2rem;
`

function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <Container>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </Container>
  );
}

export default ErrorPage