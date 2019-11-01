import React from 'react';

import { Container, Box } from './styles';
import LogginForm from './Form';

const Auth = () => {
  return (
      <Container>
        <div>
          <h2>Welcome</h2>
          <h1>let's chat!</h1>
        </div>
        <Box>
          <div>
            <LogginForm />
          </div>
        </Box>
      </Container>
  );
}

export default Auth;
