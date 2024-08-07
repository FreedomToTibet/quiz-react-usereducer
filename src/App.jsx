import {useEffect, useReducer} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

const initialState = {
  questions: [],
  answer: null,
  currentQuestion: 0,
  status: 'loading',
	points: 0,
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
    case 'answer': {
			const isCorrect = action.payload === state.questions[state.currentQuestion].correctOption;
			const points = isCorrect ? state.points + state.questions[state.currentQuestion].points : state.points;

      return {
        ...state,
        answer: action.payload,
				points,
      };
    }
    default: {
      return state;
    }
  }
};

const App = () => {
  const [{questions, status, currentQuestion, answer, points}, dispatch] = useReducer(
    reducer,
    initialState,
  );

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
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'activ' && (
          <Question
            question={questions[currentQuestion]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
