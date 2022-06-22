import React from 'react'
import './start.css'

export default function Start(props) {
	const questions = props.options.amount === 1 ? `1 question` : `${props.options.amount} questions`
	const category = props.options.category === '' ? `all categories` : `${props.getCategory(props.options.category)} category`
	const difficulty = props.options.difficulty === '' ? `any difficulty` : `${props.options.difficulty} difficulty`
	return (
		<div className='start'>
			<h1>Welcome to the Quiz!</h1>
			<h2>Click the button below to start the quiz!</h2>
			<small className='optionsSelect'>
				You will answer {questions} in {category} with {difficulty}. <a onClick={props.toggleOptions}>(change options)</a>
			</small>
			<button onClick={props.toggleStartScreen}>Start Quiz</button>
		</div>
	)
}
