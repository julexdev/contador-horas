import { useEffect } from 'react'
import { useState } from 'react';
import './styles/TimeForm.css'

const Inputs = (values) => {
	
	const classNm = values.classNm;
	const classNmId = classNm.id;
	const classNmIn = classNm.in;
	const classNmOut = classNm.out;
	const classNmTxt = classNm.txt;
	
	const dailyIn = values.dailyInOut[classNmIn];
	const dailyOut = values.dailyInOut[classNmOut];
	
	const handleTimeFormat = values.handleTimeFormat;
	
	const dayTotal = values.dayTotal[classNmId];
	
	return(
		<>
			<label htmlFor={classNmIn}>{classNmTxt}</label>			
			<input name={classNmIn} id={classNmIn} value={dailyIn} onInput={handleTimeFormat}/>
			<input name={classNmOut} id={classNmOut} value={dailyOut} onInput={handleTimeFormat}/>
			<p className='dailyTotalSign'>=</p>
			<input name={classNmId} id={classNmId} value={dayTotal} className='unavailable-box' tabIndex='-1' readOnly/>
		</>
	)
}

const setAttribs = (values) => {
	
	const attributes = [
		{type:"text"},
		{placeholder:'hh:mm'},
		{minLength:0},
		{maxLength:5}
	];
	
	values.map(
		(value) => {
			for (const valueId of [value.in, value.out, value.id]) {
				attributes.map(
					(attrib) => {
						const attribKey = Object.keys(attrib)[0];
						const attribValue = Object.values(attrib)[0];
						document.getElementById(valueId).setAttribute(attribKey,attribValue);
					}
				)
			}
		}
	)
	
}

const TimeForm = ({handleTimeFormat,dailyInOut,dayTotal}) => {
	
	const [classes, setClasses] = useState ([]);
	
	// load class names
	useEffect(() => {
		
		const dayTxts = ['Lunes:','Martes:','Miércoles:','Jueves:','Viernes:','Sábado:','Domingo:'];
		const dayNames = Object.keys(dayTotal);
		const dayInOuts = Object.keys(dailyInOut);
		
		let values = [];
		dayNames.forEach((day,i) => {
			values.push({
				id:day,
				in:dayInOuts[i*2],
				out:dayInOuts[i*2+1],
				txt:dayTxts[i]
			});
		});
		
		setClasses(values);
		
	},[]);
	
	// set attributes using class names and focus first input
	useEffect(() => {
		setAttribs(classes);
		if (document.getElementById('monIn')) {
			const firstInput = document.getElementById('monIn');
			firstInput.focus();
		}
	},[classes]);
	
	return (
		<form className='time-form'>
			{classes.map(
				(classNm) => (
					<div className='day' key={classNm.id}>
						<Inputs
							classNm={classNm}
							dailyInOut={dailyInOut}
							handleTimeFormat={handleTimeFormat}
							dayTotal={dayTotal}
						/>
					</div>
				)
			)}
		</form>
	)
}

export default TimeForm