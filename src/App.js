import React from 'react'
import './App.css'
import Question from './components/Question'
import Start from './components/Start'
import Options from './components/Options'
import Results from './components/Results'
import { nanoid } from 'nanoid'

export default function App() {
	// Get a unique token in order to do not have repeted questions
	const [token, setToken] = React.useState(localStorage.getItem('token'))
	async function getToken() {
		fetch('https://opentdb.com/api_token.php?command=request')
			.then((response) => response.json())
			.then((data) => {
				setToken(data.token)
				return localStorage.setItem('token', token)
			})
			.catch((error) => console.log(error))
	}
	React.useEffect(() => {
		if (!token) {
			getToken()
		}
	}, [])
	console.log(token)

	// Get stored options from local storage or set default values
	const [options, setOptions] = React.useState(JSON.parse(localStorage.getItem('options')))

	React.useEffect(() => {
		if (!options) {
			setOptions({
				visible: false,
				difficulty: '',
				category: '',
				amount: '5',
				type: '',
			})
		}
	}, [])
	React.useEffect(() => {
		localStorage.setItem('options', JSON.stringify(options))
	}, [options])

	// Get questions
	const [questions, setQuestions] = React.useState([])
	React.useEffect(() => {
		getQuestions()
	}, [options.difficulty, options.amount, options.category, options.type])

	const [selectedAnswers, setSelectedAnswers] = React.useState([])
	const [isChecked, setIsChecked] = React.useState(false)
	const [score, setScore] = React.useState({})
	const [turn, setTurn] = React.useState(0)
	const [startScreen, setStartScreen] = React.useState(true)

	const categories = [
		{ name: 'all', id: 'all' },
		{ name: 'General Knowledge', id: 9 },
		{ name: 'Entertainment: Books', id: 10 },
		{ name: 'Entertainment: Film', id: 11 },
		{ name: 'Entertainment: Music', id: 12 },
		{ name: 'Entertainment: Musicals & Theatres', id: 13 },
		{ name: 'Entertainment: Television', id: 14 },
		{ name: 'Entertainment: Video Games', id: 15 },
		{ name: 'Entertainment: Board Games', id: 16 },
		{ name: 'Science & Nature', id: 17 },
		{ name: 'Science: Computers', id: 18 },
		{ name: 'Science: Mathematics', id: 19 },
		{ name: 'Mythology', id: 20 },
		{ name: 'Sports', id: 21 },
		{ name: 'Geography', id: 22 },
		{ name: 'History', id: 23 },
		{ name: 'Politics', id: 24 },
		{ name: 'Art', id: 25 },
		{ name: 'Celebrities', id: 26 },
		{ name: 'Animals', id: 27 },
		{ name: 'Vehicles', id: 28 },
		{ name: 'Entertainment: Comics', id: 29 },
		{ name: 'Science: Gadgets', id: 30 },
		{ name: 'Entertainment: Japanese Anime & Manga', id: 31 },
		{ name: 'Entertainment: Cartoon & Animations', id: 32 },
	]

	function getCategory(category) {
		switch (category) {
			case '9':
				return 'General Knowledge'
			case '10':
				return 'Entertainment: Books'
			case '11':
				return 'Entertainment: Film'
			case '12':
				return 'Entertainment: Music'
			case '13':
				return 'Entertainment: Musicals & Theatres'
			case '14':
				return 'Entertainment: Television'
			case '15':
				return 'Entertainment: Video Games'
			case '16':
				return 'Entertainment: Board Games'
			case '17':
				return 'Science & Nature'
			case '18':
				return 'Science: Computers'
			case '19':
				return 'Science: Mathematics'
			case '20':
				return 'Mythology'
			case '21':
				return 'Sports'
			case '22':
				return 'Geography'
			case '23':
				return 'History'
			case '24':
				return 'Politics'
			case '25':
				return 'Art'
			case '26':
				return 'Celebrities'
			case '27':
				return 'Animals'
			case '28':
				return 'Vehicles'
			case '29':
				return 'Entertainment: Comics'
			case '30':
				return 'Science: Gadgets'
			case '31':
				return 'Entertainment: Japanese Anime & Manga'
			case '32':
				return 'Entertainment: Cartoon & Animations'
		}
	}
	// console.log(score)
	// get data from api and return it
	function getQuestions() {
		// fetch from api
		const amount = options.amount
		const difficulty = options.difficulty
		const type = options.type
		const category = options.category === 'all' ? '' : options.category
		const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}&token=${token}`
		console.log('fetch from', url)

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				data.response_code === 3 ?? getToken()
				data.response_code === 4 ?? getToken()
				data.results.forEach((question) => {
					question.incorrect_answers.push(question.correct_answer)
					question.incorrect_answers = question.incorrect_answers.sort()
				})
				setQuestions(data.results)
			})
			.catch((error) => console.log(error))
	}

	function handleOptionsChange(event) {
		setOptions((prevOptions) => {
			return {
				...prevOptions,
				[event.target.name]: event.target.value,
			}
		})
	}
	function toggleOptions() {
		setOptions((prevOptions) => {
			return {
				...prevOptions,
				visible: !prevOptions.visible,
			}
		})
	}

	function toggleStartScreen() {
		setStartScreen((prevStartScreen) => {
			return !prevStartScreen
		})
	}

	function handleQuestionClick(questionId, answer) {
		if (!isChecked) {
			setSelectedAnswers((prevState) => {
				const newState = { ...prevState }
				newState[questionId] = answer
				return newState
			})
		}
	}

	// compare answers with correct answer
	function checkAnswers() {
		if (Object.getOwnPropertyNames(selectedAnswers).length === questions.length) {
			setIsChecked(true)
			const correctAnswers = questions.map((question) => question.correct_answer)
			let count = 0
			Object.keys(selectedAnswers).map((key) => {
				if (selectedAnswers[key] === correctAnswers[key]) {
					return count++
				}
			})
			setScore((prevState) => {
				const newState = { ...prevState }
				newState[turn] = {
					turn: turn,
					correctsAnswers: count,
					questions: questions.length,
				}
				return newState
			})
		}
	}

	function restartGame() {
		setTurn((prevTurn) => prevTurn + 1)
		setIsChecked(false)
		setSelectedAnswers([])
		getQuestions()
	}

	// map questions to question components
	// console.log(questions)

	// take all scores from score object and add them in a total score const
	const totalScore = Object.values(score).reduce((acc, curr) => {
		return acc + curr.correctsAnswers
	}, 0)
	const totalQuestions = Object.values(score).reduce((acc, curr) => {
		return acc + curr.questions
	}, 0)
	const totalTurns = Object.keys(score).length

	return (
		<div className='App'>
			{startScreen && <Start options={options} toggleOptions={toggleOptions} toggleStartScreen={toggleStartScreen} getCategory={getCategory} />}
			{options.visible && (
				<Options options={options} toggleOptions={toggleOptions} handleOptionsChange={handleOptionsChange} getCategory={getCategory} categories={categories} />
			)}
			{!startScreen &&
				questions.map((question) => (
					<Question
						className={options.visible ? 'hidden' : ''}
						key={nanoid()}
						id={questions.indexOf(question)}
						question={question.question}
						category={question.category}
						correct_answer={question.correct_answer}
						incorrect_answers={question.incorrect_answers}
						answers={question.answers}
						handleQuestionClick={handleQuestionClick}
						selectedAnswer={selectedAnswers[questions.indexOf(question)]}
						isChecked={isChecked}
					/>
				))}
			{/* {!startScreen && Object.getOwnPropertyNames(selectedAnswers).length !== questions.length && <button className='check'>Check answers</button>} */}
			{!startScreen && (
				<button type='submit' className={options.visible ? 'check hidden' : 'check'} onClick={isChecked ? restartGame : checkAnswers}>
					{isChecked ? 'Restart' : 'Check answers'}
				</button>
			)}
			{/* 
				<button className={options.visible ? 'check hidden' : 'check'} onClick={isChecked ? restartGame : checkAnswers}>
					{isChecked ? 'Restart' : 'Check answers'}
				</button> */}
			{!startScreen && (
				<Results
					options={options}
					toggleOptions={toggleOptions}
					getCategory={getCategory}
					score={totalScore}
					totalQuestions={totalQuestions}
					totalTurns={totalTurns}
				/>
			)}
		</div>
	)
}
