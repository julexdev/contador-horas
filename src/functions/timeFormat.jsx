import focusNext from "./focusNext";

const timeFormat = (e) => { // formatea los inputs de horario
	
	const value = e.target.value;
	
	// based on: https://codesandbox.io/s/github/arbaz52/custom-input-time?file=/src/App.tsx
	let result = value;
	// if there are multiple ':', is invalid
	if ((result.match(/:/g) || []).length > 1) return;
	// keep only valid chars
	result = result.replace(/[^:0-9]/g, "");
	let [hh, mm] = value.split(":");
	const nhh = hh ? Number(hh) : 0;
	const nmm = mm ? Number(mm) : 0;
	// if they're not valid, no need to update the state
	if (
		(hh && (Number(hh) > 23 || hh.length > 2)) ||
		(mm && (Number(mm) > 59 || mm.length > 2))
	) return;		
	// if separator does not exist and hour digits are > 2 need to add a separator
	// add a leading 0, for consistency
	if (!value.includes(":") && hh && ( hh.length >= 2 || nhh > 2 )) {
		hh = `${hh.length === 1 ? "0" : ""}${result}`;
		result = `${hh}:`;
	}
	// add a leading 0 for minutes (24~99)
	let needFocus = false;
	if (value.includes(":") && mm && ( mm.length == 1 && nmm >= 6 )) {
		mm = `${mm.length === 1 ? "0" : ""}${mm}`;
		result = `${hh}:${mm}`;
		needFocus = true;
	}
	if (needFocus) focusNext(e);
	return result;
}

export default timeFormat