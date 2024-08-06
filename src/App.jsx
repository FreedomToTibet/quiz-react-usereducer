import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loading from './components/Loading';
import Error from './components/Error';

const initialState = {
	questions: [],
	// answers: [],
	// currentQuestion: 0,
	status: "loading",
}

const reducer = (state, action) => {
	switch (action.type) {
		case "dataReceived": {
			return {
				...state,
				questions: action.payload,
				status: "ready",
			}
		}
		case "dataFailed": {
			return {
				...state,
				status: "failed",
			}
		}
		default: {
			return state;
		}
	}
}

const App = () => {
	const [{questions, status}, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch('http://localhost:3000/questions')
			.then(response => response.json())
			.then(data => dispatch({ type: "dataReceived", payload: data }))
			.catch(error => dispatch({ type: "dataFailed", payload: error }))
	}, [])
  
  return (
    <div className='app'>
      <Header />
			<Main>
				{status === "loading" && <Loading />}
				{status === "failed" && <Error />}
				{status === "ready" && <p>Ready</p>}
			</Main>
    </div>
  );
}

export default App;
