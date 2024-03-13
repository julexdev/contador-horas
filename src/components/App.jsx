import Container from './Container'
import './styles/App.css'

const App = () => (
	<>
		<h1>Contador de Horas</h1>
		
		<div className="main-container">
			
			<p className='subtitle'>Horario de entrada y salida</p>
			
			<Container/>
			
			<p>(El total de horas está representado en decimal)</p>
			<p className='note'>(Horario de entrada min: 05:00 | Horario de salida max: 04:59)</p>
			
		</div>
		
		<p className='info'>
			<a className="julex" href="https://github.com/julexdev">Copyright © 2024  Julian Cejas</a>
			<a className="credit" title="on time icons" href="https://www.flaticon.com/free-icons/on-time">Favicon by Freepik - Flaticon</a>
			<a className="credit" title="source code" href="https://github.com/julexdev">source code</a>
		</p>
	</>
)

export default App