import React from 'react'


const NumberFormat = (number)=>{
	return new Intl.NumberFormat().format(number)
}

const Capitalize = (name)=>{
	const firstLetter = name.slice(0,1)
	const otherLetters = name.slice(1)
	const fisrtToUpper = firstLetter.toUpperCase()
	const newWord = fisrtToUpper + otherLetters
	return newWord
}

export {NumberFormat, Capitalize}