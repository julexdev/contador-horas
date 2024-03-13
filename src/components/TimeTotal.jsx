import './styles/TimeTotal.css'

const TimeTotal = ({totalHours,multiplier,handleMult,totalMult,handleClear}) => (
	
	<div className='timeTotal-container'>
		
		<table><tbody>
			<tr>
				<td className='unavailable-box'>Total: {totalHours}</td>
			</tr>
		</tbody></table>
		
		<p className='multiplier'>X</p>
		
		<input className='multiplier-box'
			type="text" name="mulpipl" id="mulpipl"
			minLength={0} maxLength={5}
			value={multiplier} onInput={handleMult}/>
		
		<p className='multiplier'>=</p>
		
		<input className='multiplier-box total'
			type="text" name="result" id="result"
			minLength={0} maxLength={7}
			value={totalMult} readOnly/>
		
		<div className='clear-button-container'>
			<button onClick={handleClear} className='clear-button'>
				Limpiar
			</button>
		</div>
		
	</div>
	
)

export default TimeTotal