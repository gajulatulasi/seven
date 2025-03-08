import React, { useState } from 'react';
import { Home, BookOpen, Library, Github, Twitter, Mail, Bell } from 'lucide-react';
import ClimateAIDashboard from './components/ClimateAIDashboard';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

function NavItem({ icon: Icon, label, active, onClick, badge }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-green-100 text-green-700' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <div className="relative">
        <Icon className="w-5 h-5" />
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{badge}</span>
        )}
      </div>
      <span>{label}</span>
    </button>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-green-700">ClimateAI Predictor</h1>
              <div className="flex space-x-2">
                <NavItem
                  icon={Home}
                  label="Dashboard"
                  active={activeSection === 'dashboard'}
                  onClick={() => setActiveSection('dashboard')}
                />
                <NavItem
                  icon={BookOpen}
                  label="About"
                  active={activeSection === 'about'}
                  onClick={() => setActiveSection('about')}
                />
                <NavItem
                  icon={Library}
                  label="Resources"
                  active={activeSection === 'resources'}
                  onClick={() => setActiveSection('resources')}
                />
                <NavItem
                  icon={Bell}
                  label=""
                  active={activeSection === 'notifications'}
                  onClick={() => setActiveSection('notifications')}
                  badge={notifications}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'dashboard' && <ClimateAIDashboard />}
        {activeSection === 'about' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">About ClimateAI Predictor</h2>
            <p className="text-gray-600 mb-6">
              ClimateAI Predictor leverages advanced artificial intelligence to provide accurate climate change predictions
              and insights. Our platform combines historical data, satellite imagery, and machine learning models to help
              understand and prepare for climate-related challenges.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
                  alt="Nature landscape"
                  className="rounded-lg object-cover w-full h-64"
                />
                <p className="text-sm text-gray-600">
                  Our AI models analyze vast amounts of environmental data to predict future climate patterns and their impact on ecosystems.
                </p>
              </div>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  alt="Climate impact"
                  className="rounded-lg object-cover w-full h-64"
                />
                <p className="text-sm text-gray-600">
                  We use advanced machine learning algorithms to predict and visualize potential climate change impacts across different regions.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Featured Datasets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Global Temperature Records</h3>
                <p className="text-gray-600">Historical temperature data from over 10,000 weather stations worldwide.</p>
                <p className="text-sm text-green-600 mt-2">Updated daily</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Satellite Imagery Analysis</h3>
                <p className="text-gray-600">High-resolution satellite data tracking environmental changes.</p>
                <p className="text-sm text-green-600 mt-2">Updated weekly</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Ocean Temperature Data</h3>
                <p className="text-gray-600">Deep-sea temperature measurements from global monitoring stations.</p>
                <p className="text-sm text-green-600 mt-2">Updated monthly</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Our Mission</li>
                <li>Team</li>
                <li>Partners</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Documentation</li>
                <li>API Access</li>
                <li>Research Papers</li>
                <li>Case Studies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-6">
                <a href="mailto:contact@climateai.com" className="text-gray-600 hover:text-green-700">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/climateai" className="text-gray-600 hover:text-green-700">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://github.com/climateai" className="text-gray-600 hover:text-green-700">
                  <Github className="w-5 h-5" />
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-600">© 2025 ClimateAI Predictor. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;