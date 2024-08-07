import {useEffect, useReducer} from 'react';
import Header from './UI/Header';
import Main from './components/Main';
import Loader from './UI/Loader';
import Error from './UI/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './UI/NextButton';
import Progress from './UI/Progress';
import FinishScreen from './components/FinishScreen';

const initialState = {
  questions: [],
  answer: null,
  currentQuestion: 0,
  status: 'loading',
  points: 0,
	highscore: 0,
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
      const isCorrect =
        action.payload === state.questions[state.currentQuestion].correctOption;
      const points = isCorrect
        ? state.points + state.questions[state.currentQuestion].points
        : state.points;

      return {
        ...state,
        answer: action.payload,
        points,
      };
    }
    case 'next': {
      return {
        ...state,
        answer: null,
        currentQuestion: state.currentQuestion + 1,
      };
    }
		case 'finished': {
			return {
				...state,
				status: 'finished',
				highscore: state.points > state.highscore ? state.points : state.highscore,
			};
		}
    default: {
      return state;
    }
  }
};

const App = () => {
  const [{questions, status, currentQuestion, answer, points, highscore}, dispatch] = useReducer(
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
          <>
            <Progress
              currentQuestion={currentQuestion}
              numQuestions={numQuestions}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[currentQuestion]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              currentQuestion={currentQuestion}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === 'finished' && <FinishScreen points={points} highscore={highscore} />}
      </Main>
    </div>
  );
};

export default App;
