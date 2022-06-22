import React from 'react'
import './results.css'

export default function Results(props) {
	const questions = props.options.amount === 1 ? `1 question` : `${props.options.amount} questions`
	const category = props.options.category === 'All' ? `all categories` : `${props.getCategory(props.options.category)} category`
	const difficulty = props.options.difficulty === '' ? `any difficulty` : `${props.options.difficulty} difficulty`
	return (
		<div>
			<div className='results'>
				<h1>Results</h1>
				<span>
					You scored {props.score} / {props.totalQuestions} in {props.totalTurns} turns
				</span>
			</div>
			<small className='optionsSelect'>
				You are playing rounds of {questions} in {category} with {difficulty}. <a onClick={props.toggleOptions}>(change options)</a>
			</small>
		</div>
	)
}

// export default function Start(props) {

// 	return (
// 		<div className='start'>
// 			<h1>Welcome to the Quiz!</h1>
// 			<h2>Click the button below to start the quiz!</h2>

// 			<button onClick={props.toggleStartScreen}>Start Quiz</button>
// 		</div>
// 	)
// }
