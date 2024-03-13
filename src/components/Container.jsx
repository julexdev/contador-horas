import { useEffect } from 'react'
import { useState } from 'react'
import './styles/Container.css'
import timeFormat from '../functions/timeFormat'
import focusNext from '../functions/focusNext'
import calcDaily from '../functions/calcDaily'
import calcTotal from '../functions/calcTotal'
import TimeForm from './TimeForm'
import TimeTotal from './TimeTotal'

const Container = () => {
	
	const [dailyInOut,setDailyInOut] = useState({
		monIn: "",
		monOut: "",
		tueIn: "",
		tueOut: "",
		wedIn: "",
		wedOut: "",
		thuIn: "",
		thuOut: "",
		friIn: "",
		friOut: "",
		satIn: "",
		satOut: "",
		sunIn: "",
		sunOut: ""
	});
	
	const [dayTotal,setDayTotal] = useState({
		monday: "",
		tuesday: "",
		wednesday: "",
		thursday: "",
		friday: "",
		saturday: "",
		sunday: ""
	});
	
	const [totalHours,settotalHours] = useState("0"); // set by calcTotal (when the daily total is modified)
	const [multiplier,setMultiplier] = useState("0"); // set by handleMult (when a multiplier value is entered)
	const [totalMult,settotalMult] = useState("0"); // set by multiply (when totalHours or multiplier is modified)
	
	// ==========================================
	
	const handleTimeFormat = (e) => { // formats the time inputs
		let timeFormated = timeFormat(e);
		let eventName = e.target.name;
		
		if (Object.keys(dailyInOut).includes(eventName)) {
			setDailyInOut({
				...dailyInOut,
				[eventName]: timeFormated
			});
		}
	}
	
	// ==========================================
	
	useEffect (() => { // sets DayTotal based on dailyInOut
		// is helped by the calcDaily function
		setDayTotal({
			...dayTotal,
			...calcDaily(dailyInOut,dayTotal)
		});
	},[dailyInOut]);
	
	useEffect (() => { // sets totalHours based on dayTotal
		// is helped by the calcTotal function
		settotalHours(calcTotal(dayTotal));
	},[dayTotal]);
	
	// ==========================================
	
	const handleMult = (e) => { // determines multiplier value
		
		const value = e.target.value;
		
		setMultiplier(value);
	}
	
	const multiply = () => {
		let mult = totalHours * multiplier;
		mult = mult.toFixed(2);
		settotalMult(mult);
	}
	
	useEffect (() => { // calculates the multiplication total
		multiply();
	},[multiplier, totalHours]);
	
	// ==========================================
	
	const handleClear = async e => { // cleans the inputs
		e.preventDefault();
		setDailyInOut({
			monIn: "",
			monOut: "",
			tueIn: "",
			tueOut: "",
			wedIn: "",
			wedOut: "",
			thuIn: "",
			thuOut: "",
			friIn: "",
			friOut: "",
			satIn: "",
			satOut: "",
			sunIn: "",
			sunOut: ""
		});
		setDayTotal({
			monday: "",
			tuesday: "",
			wednesday: "",
			thursday: "",
			friday: "",
			saturday: "",
			sunday: ""
		});
		settotalHours("0");
		setMultiplier("0");
		settotalMult("0");
		const firstInput = document.getElementById('monIn');
		firstInput.focus();
	}
	
	// ==========================================
	
	useEffect( () => { // advances to the next entry after completing typing numbers
		const container = document.getElementsByClassName("form-container")[0];
		container.onkeypress = function (e) {focusNext(e)}
	})
	
	// ==========================================
	
	return (
		<div className='form-container'>
			
			<TimeForm
				handleTimeFormat={handleTimeFormat}
				dailyInOut={dailyInOut}
				dayTotal={dayTotal}
			/>
			
			<TimeTotal
				totalHours={totalHours}
				multiplier={multiplier}
				handleMult={handleMult}
				totalMult={totalMult}
				handleClear={handleClear}
			/>
			
		</div>
	)
}

export default Container