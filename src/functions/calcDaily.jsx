function gapHoras (inOut) { // función para calcDaily: calcula cant horas diarias
	
	let [hourIn, hourOut] = inOut;
	
	let gapHH = 0;
	let gapMM = 0;
	
	let [inHH, inMM] = ["00","00"];
	let [outHH, outMM] = ["00","00"];
	
	// check for complete strings
	if (hourIn) {
		[inHH, inMM] = hourIn.split(":");
		if (!inHH || !inMM) {return "00:00"}
	} else {return "00:00"}
	if (hourOut) {
		[outHH, outMM] = hourOut.split(":");
		if (!outHH || !outMM) {return "00:00"}
	} else {return "00:00"}
	
	inHH = Number(inHH);
	outHH = Number(outHH);
	if ((Number.isFinite(inHH)) && (Number.isFinite(outHH))) {
		// horas desde las 00 hasta las 04 cuenta como el mismo día
		if (inHH >= 0 && inHH <= 4) {
			inHH += 24;
		}
		if (outHH >= 0 && outHH <= 4) {
			outHH += 24;
		}
	} else {gapHH = 0}
	
	inMM = Number(inMM);
	outMM = Number(outMM);
	if (Number.isFinite(inMM) && (Number.isFinite(outMM))) {
		
		// check más de 60 min
		if (inMM >= 60) {
			inHH = inHH + Math.trunc(inMM / 60);
			inMM %= 60;
		}
		if (outMM >= 60) {
			outHH = outHH + Math.trunc(outMM / 60);
			outMM %= 60;
		}			
	} else {gapMM = 0}
	
	// checkear horarios del mismo dia:
	// en caso de que la hora de entrada sea > a la de salida
	if (inHH > outHH) return "00:00";
	// y que los minutos de entrada sean >= que los de salida cuando la hora es =
	if ((inHH == outHH) && (inMM >= outMM)) return "00:00";
	
	// calculo de gap
	gapHH = parseInt(outHH) - parseInt(inHH);
	gapMM = parseInt(outMM) - parseInt(inMM);
	
	if (gapMM < 0) {
		gapHH -= 1;
		let auxMM = gapMM;
		gapMM = 60;
		gapMM += auxMM;
	}
	
	if (gapMM < 10) {gapMM = gapMM.toString().padStart(2,"0")}
	
	let tempTotal = gapHH.toString() + ":" + gapMM.toString();
	return tempTotal;
}

// ==========================================

const calcDaily = (dailyInOut,dayTotal) => { // calculo diario
	
	let listaElementos = Object.values(dailyInOut);
	
	const parejas = listaElementos.reduce(function(result, value, index, array) {
		if (index % 2 === 0)
			result.push(array.slice(index, index + 2));
		return result;
	}, []);
	
	const totalHours = parejas.reduce(function(result, currentValue) {
		const totalDaily = gapHoras(currentValue);
		result.push(totalDaily);
		return result;
	}, []);
	
	const dayKeys = Object.keys(dayTotal);
	
	let pair = {};
	for (let i = 0; i < 7; i++) {
		pair[dayKeys[i]] = totalHours[i];
	}
	return pair;
}

export default calcDaily