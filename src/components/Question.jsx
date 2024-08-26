import { useQuiz } from '../context/QuizContext';
import Options from "./Options";

const Question = () => {
	const { questions, currentQuestion, dispatch, answer } = useQuiz();
	const question = questions[currentQuestion];
  return (
    <div className='questions'>
      <h3>{question.question}</h3>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};

export default Question;
