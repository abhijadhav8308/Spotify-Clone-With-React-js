import Login from './login'
import Dashboard from './Dashboard';
import './App.css'
const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code ? <Dashboard code={code}/> : <Login />
}

export default App;