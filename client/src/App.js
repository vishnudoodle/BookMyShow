import { BrowserRouter, Route ,Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import Movie from './pages/Movie';
import Signup from './pages/Signup';
import Location from './pages/Location'

import "./asset/css/style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route 
              path="/"
              element={ <Home />}
            />
            <Route 
              path="/signup"
              element={ <Signup />}
            />
            <Route 
              path="/movie"
              element={ <Movie />}
            />
            <Route 
              path="/dashboard"
              element={ <Dashboard />}
            />
            <Route 
              path="/location/:id"
              element={ <Location />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
