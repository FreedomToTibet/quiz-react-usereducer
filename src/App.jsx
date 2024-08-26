import {useEffect, useReducer} from 'react';

import Main from './components/Main';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import FinishScreen from './components/FinishScreen';

import { useQuiz } from './context/QuizContext';

import NextButton from './UI/NextButton';
import Progress from './UI/Progress';
import Header from './UI/Header';
import Footer from './UI/Footer';
import Timer from './UI/Timer';
import Loader from './UI/Loader';
import Error from './UI/Error';



const App = () => {
	const { status } = useQuiz();
  
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'failed' && <Error />}
        {status === 'ready' && (
          <StartScreen />
        )}
        {status === 'activ' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen />
        )}
      </Main>
    </div>
  );
};

export default App;