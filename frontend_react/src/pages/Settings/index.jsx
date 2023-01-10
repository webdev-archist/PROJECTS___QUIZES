import {useEffect, useState, useContext} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AuthContext } from '../../utils/auth'
import PagesComponents from '../../components/pagesComponents.js'

function Settings() {
	let [Contents, setContents] = useState([])
	, {token, datas, user, setUser, setDatas} = useContext(AuthContext)
    , navigate = useNavigate()
	, generateOutput = (contents) => {
		let { titre, userId, imageUrl, contenu, creationDate } = contents || {}
		, contents_tmp = []
        contents_tmp.push(<>
            <h2>{titre}</h2>
            <p>{creationDate}</p>
            {// <p>{new Date(creationDate)}</p> 
			}
            <img src={imageUrl} alt={titre} />
            <p>{contenu}</p>
        </>)
		console.log(contents)

		// contents_tmp.push(<Template data={template} bem="template" />)
		// setContents(contents_tmp = <span>okok span</span>)
		setContents(contents_tmp)
	}
	console.log("oioioui");
	
    useEffect(() => {
		/*
		console.log(datas)
	    if(token==false)navigate('/login')
		else generateOutput(datas.home)
        const post = datas?.modelsDatas?.post.find(e=>document.location.pathname.split('/')[2] == e.titre.replace(' ','-')+'-'+e._id)
		generateOutput(post)
		*/
	}, [datas])






	const [numQuestions, setNumQuestions] = useState(5);
	const [timePerQuestion, setTimePerQuestion] = useState(5);
	const [quizMode, setQuizMode] = useState('sequential');

	function handleNumQuestionsChange(e) {
		setNumQuestions(e.target.value);
	}

	function handleTimePerQuestionChange(e) {
		setTimePerQuestion(e.target.value);
	}

	function handleQuizModeChange(e) {
		setQuizMode(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		// Envoyer les paramètres au composant principal de l'application ou les stocker localement.
		console.log(`Numéro de question: ${numQuestions}, Temps par question: ${timePerQuestion}, mode de quiz: ${quizMode}`)
		navigate('/')
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Paramètres de quiz</h1>
			<label>
				Nombre de questions :
				<input type="number" value={numQuestions} onChange={handleNumQuestionsChange} />
			</label>
			<br />
			<label>
				Temps par question (en secondes) :
				<input type="number" value={timePerQuestion} onChange={handleTimePerQuestionChange} />
			</label>
			<br />
			<label>
				Mode de quiz :
				<br />
				<label>
				<input
					type="radio"
					name="quiz-mode"
					value="sequential"
					checked={quizMode === 'sequential'}
					onChange={handleQuizModeChange}
				/>
				Séquentiel
				</label>
				<label>
				<input
					type="radio"
					name="quiz-mode"
					value="random"
					checked={quizMode === 'random'}
					onChange={handleQuizModeChange}
				/>
				Aléatoire
				</label>
			</label>
			<br />
			<button type="submit">Sauvegarder</button>
		</form>
	);
}

export default Settings;
