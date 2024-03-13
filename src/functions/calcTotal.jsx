function decimalAdding (accumulator, currentValue) { // función para calcTotal: suma los totales
	
	let totalHH = 0;
	let totalMM = 0;
	
	let [hh, mm] = currentValue.split(":");
	hh = Number(hh);
	if (Number.isFinite(hh)) {
		totalHH += parseInt(hh);
	}
	
	mm = Number(mm);
	if (Number.isFinite(mm)) {
		totalMM += parseInt(mm);
	}
	
	totalMM /= 60;
	
	let tempTotal = accumulator + totalHH + totalMM;
	const tempTotalNum = Number(tempTotal.toPrecision(4));
	
	return tempTotalNum;
}

// ==========================================

const calcTotal = (dayTotal) => { // calculo total de horas en decimal
	
	let hours = Object.values(dayTotal);
	
	let totalHours = hours.reduce(decimalAdding,0);
	
	totalHours = totalHours.toFixed(2);
	
	return totalHours;
}

export default calcTotal