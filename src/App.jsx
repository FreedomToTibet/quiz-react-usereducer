import {useEffect, useReducer} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

const initialState = {
  questions: [],
  // answers: [],
  currentQuestion: 0,
  status: 'loading',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived': {
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    }
    case 'dataFailed': {
      return {
        ...state,
        status: 'failed',
      };
    }
    case 'start': {
      return {
        ...state,
        status: 'activ',
      };
    }
    default: {
      return state;
    }
  }
};

const App = () => {
  const [{questions, status, currentQuestion}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    fetch('http://localhost:3000/questions')
      .then((response) => response.json())
      .then((data) => dispatch({type: 'dataReceived', payload: data}))
      .catch((error) => dispatch({type: 'dataFailed', payload: error}));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'failed' && <Error />}
        {status === 'ready' && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {status === 'activ' && <Question question={questions[currentQuestion]} />}
      </Main>
    </div>
  );
};

export default App;
