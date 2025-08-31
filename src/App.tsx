import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from '@/pages/Dashboard';
import { Announcements } from '@/pages/Announcements';
import { RoommatePreferences } from '@/pages/Roommates/RoommatePreferences';
import { RoommateResults } from '@/pages/Roommates/RoommateResults';
import RoommateDetails from '@/pages/Roommates/RoommateDetails';
import RoommateChat from '@/pages/Roommates/RoommateChat';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/roommates" element={<RoommatePreferences />} />
          <Route path="/roommates/results" element={<RoommateResults />} />
          <Route path="/roommates/details/:id" element={<RoommateDetails />} />
          <Route path="/roommates/chat/:id" element={<RoommateChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
