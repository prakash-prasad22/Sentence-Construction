import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Test from './pages/Test'
import Result from './pages/Result'

/**
 * App Component
 * -------------
 * Main application component that sets up the routing for the Sentence Construction Game.
 *
 * Overview:
 * This component uses React Router to define the different routes of the application.
 * It renders the appropriate page component based on the URL.
 *
 * Features:
 * - Sets up client-side routing using BrowserRouter.
 * - Defines the following routes:
 *  - "/" :  Renders the Home component (landing page).
 *  - "/test": Renders the Test component (quiz page).
 *  - "/result": Renders the Result component (results page).
 *
 * Technical Details:
 * - Uses BrowserRouter from react-router-dom for handling navigation.
 * - Uses Routes and Route components to define the application's routes.
 * - Uses Navigate to redirect to a specific route.
 */


function App() {

  /**
   * Renders the App component.
   *
   * @returns {JSX.Element} The JSX representation of the App component.
   */

  return (
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />
        {/* Route for the test page */}
        <Route path="/test" element={<Test />} />
        {/* Route for the result page */}
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  )
}

export default App
