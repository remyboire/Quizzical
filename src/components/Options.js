import { nanoid } from 'nanoid'
import React from 'react'
import './options.css'

export default function Options(props) {
	if (props.options.visible)
		return (
			<div className='options'>
				<h1>Options panel</h1>
				<fieldset>
					<legend>Difficulty</legend>
					<input type='radio' id='any' name='difficulty' value='' checked={props.options.difficulty === ''} onChange={props.handleOptionsChange} />
					<label htmlFor='any'>any</label>
					<input type='radio' id='easy' name='difficulty' value='easy' checked={props.options.difficulty === 'easy'} onChange={props.handleOptionsChange} />
					<label htmlFor='easy'>easy</label>
					<input type='radio' id='medium' name='difficulty' value='medium' checked={props.options.difficulty === 'medium'} onChange={props.handleOptionsChange} />
					<label htmlFor='medium'>medium</label>
					<input type='radio' id='hard' name='difficulty' value='hard' checked={props.options.difficulty === 'hard'} onChange={props.handleOptionsChange} />
					<label htmlFor='hard'>hard</label>
				</fieldset>
				<fieldset>
					<legend>Amount of questions</legend>
					<input type='radio' id='amount-1' name='amount' value='1' checked={props.options.amount === '1'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-1'>1</label>
					<input type='radio' id='amount-2' name='amount' value='2' checked={props.options.amount === '2'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-2'>2</label>
					<input type='radio' id='amount-3' name='amount' value='3' checked={props.options.amount === '3'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-3'>3</label>
					<input type='radio' id='amount-4' name='amount' value='4' checked={props.options.amount === '4'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-4'>4</label>
					<input type='radio' id='amount-5' name='amount' value='5' checked={props.options.amount === '5'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-5'>5</label>
					<input type='radio' id='amount-6' name='amount' value='6' checked={props.options.amount === '6'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-6'>6</label>
					<input type='radio' id='amount-7' name='amount' value='7' checked={props.options.amount === '7'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-7'>7</label>
					<input type='radio' id='amount-8' name='amount' value='8' checked={props.options.amount === '8'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-8'>8</label>
					<input type='radio' id='amount-9' name='amount' value='9' checked={props.options.amount === '9'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-9'>9</label>
					<input type='radio' id='amount-10' name='amount' value='10' checked={props.options.amount === '10'} onChange={props.handleOptionsChange} />
					<label htmlFor='amount-10'>10</label>
				</fieldset>
				<fieldset>
					<legend>Type</legend>
					<input type='radio' id='both' name='type' value='' checked={props.options.type === ''} onChange={props.handleOptionsChange} />
					<label htmlFor='both'>Both</label>
					<input type='radio' id='multiple' name='type' value='multiple' checked={props.options.type === 'multiple'} onChange={props.handleOptionsChange} />
					<label htmlFor='multiple'>Multiple</label>
					<input type='radio' id='boolean' name='type' value='boolean' checked={props.options.type === 'boolean'} onChange={props.handleOptionsChange} />
					<label htmlFor='boolean'>True / False</label>
				</fieldset>
				<fieldset>
					<legend>Category</legend>
					{props.categories.map((category) => (
						<span key={nanoid()}>
							<input
								type='radio'
								id={category.id}
								name='category'
								value={category.id}
								checked={props.options.category == category.id}
								onChange={props.handleOptionsChange}
							/>
							<label htmlFor={category.id}>{category.name}</label>
						</span>
					))}
				</fieldset>
				<button onClick={props.toggleOptions}>CLOSE OPTIONS</button>
			</div>
		)
}
