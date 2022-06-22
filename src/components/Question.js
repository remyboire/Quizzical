import React from 'react'
import './question.css'
import { nanoid } from 'nanoid'
import he from 'he'

// Evolution needed : change h1 and div for fieldset, inputs and legend

export default function Question(props) {
	const sortedAnswers = props.incorrect_answers.map((answer) => (
		<button
			className={`answer ${props.selectedAnswer === answer ? 'selected' : ''} ${answer === props.correct_answer && props.isChecked ? 'correct' : ''} ${
				answer !== props.correct_answer && props.isChecked ? 'incorrect' : ''
			}`}
			key={nanoid()}
			onClick={() => props.handleQuestionClick(props.id, answer)}
		>
			{he.decode(answer)}
		</button>
	))

	return (
		<div className={`question--wrapper ${props.className}`}>
			<h1 className='question'>{he.decode(props.question)}</h1>
			<h2 className='category'>{he.decode(props.category)}</h2>
			<div className='answers'>
				<div className='answers'>{sortedAnswers}</div>
			</div>
		</div>
	)
}
