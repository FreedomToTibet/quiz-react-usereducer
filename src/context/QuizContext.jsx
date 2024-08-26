import { createContext, useContext, useReducer, useEffect } from 'react';

const QuizContext = createContext();

const initialState = {
  questions: [],
  answer: null,
  currentQuestion: 0,
  status: 'loading',
  points: 0,
  // highscore: 0,
  highscore: localStorage.getItem('highscore') ? parseInt(localStorage.getItem('highscore'), 10) : 0,
  secondsRemaining: 450,
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
			const newHighscore = state.points > state.highscore ? state.points : state.highscore;
      localStorage.setItem('highscore', newHighscore);

      return {
        ...state,
        status: 'finished',
        highscore: newHighscore,
      };
    }
    case 'restart': {
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    }
    case 'tick': {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    }
    default: {
      return state;
    }
  }
};

const QuizProvider = ({children}) => {
	const [{questions, status, currentQuestion, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

	const numQuestions = questions.length;

	useEffect(() => {
    fetch('http://localhost:3000/questions')
      .then((response) => response.json())
      .then((data) => dispatch({type: 'dataReceived', payload: data}))
      .catch((error) => dispatch({type: 'dataFailed', payload: error}));
  }, []);

	return (
		<QuizContext.Provider value={{questions, status, currentQuestion, answer, points, highscore, secondsRemaining, dispatch, numQuestions}}>
			{children}
		</QuizContext.Provider>
	)
}

const useQuiz = () => {
	const context = useContext(QuizContext);

	if (!context) {
		throw new Error('useQuiz must be used within a QuizProvider');
	}

	return context;
}

export { QuizProvider, useQuiz };
