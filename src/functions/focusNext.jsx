function focusNext (e) {
	
	let tabbableInputs = Array.from(document.getElementsByTagName('input'));
	tabbableInputs = tabbableInputs.filter(input => input.className != "unavailable-box");
	
	const target = e.target;
	
	try {
		const currLength = target.value.length;
		const maxLength = parseInt(target.attributes["maxLength"].value, 10); // try access property "value" (doesn't work in clear buton: crash)
		
		if (currLength >= maxLength-1) { // si al presionar la tecla el current length es mayor al total...
			
			let numbersKey = Array.from({length: 10},(_,i)=> i.toString()); // only numbers
			let currIndex = tabbableInputs.indexOf(target);
			const value = e.key ? e.key : e.nativeEvent.data; // onkeypress vs onChange
			
			if ((currIndex < 15) && (numbersKey.includes(value))) { // numbersKey is used to focus next entering only numbers
				currIndex = tabbableInputs[currIndex + 1];
				currIndex.focus();
				currIndex.select();
			}
		}
	} catch {}
}

export default focusNext