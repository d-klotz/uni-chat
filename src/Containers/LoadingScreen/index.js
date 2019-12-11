import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/6527-conversation.json';

import { Container } from './styles'; 
import { BounceOut } from 'animate-css-styled-components';

const LoadingScreen = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Container>
      <BounceOut delay="5s">
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
      </BounceOut>
    </Container>
  );
}

export default LoadingScreen;
