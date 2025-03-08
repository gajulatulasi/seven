import React, { useState } from 'react';
import { Home, BookOpen, Library, Github, Twitter, Mail, Bell, Database } from 'lucide-react';
import ClimateAIDashboard from './components/ClimateAIDashboard';
import ThemeToggle from './components/ThemeToggle';

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
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      <div className="relative">
        <Icon className="w-5 h-5" />
        {badge !== undefined && badge > 0 && (
          <span className="notification-badge">{badge}</span>
        )}
      </div>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-primary">ClimateAI Predictor</h1>
              <div className="flex space-x-2">
                <NavItem
                  icon={Home}
                  label="Dashboard"
                  active={activeSection === 'dashboard'}
                  onClick={() => setActiveSection('dashboard')}
                />
                <NavItem
                  icon={Database}
                  label="Datasets"
                  active={activeSection === 'datasets'}
                  onClick={() => setActiveSection('datasets')}
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
                  label="Notifications"
                  active={activeSection === 'notifications'}
                  onClick={() => setActiveSection('notifications')}
                  badge={notifications}
                />
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'dashboard' && <ClimateAIDashboard />}
        {activeSection === 'datasets' && (
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Climate Datasets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-accent rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Global Temperature Records</h3>
                <p className="text-muted-foreground mb-4">
                  Historical temperature data from over 10,000 weather stations worldwide.
                </p>
                <div className="text-sm text-primary">Updated daily</div>
              </div>
              <div className="p-6 bg-accent rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Satellite Imagery Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  High-resolution satellite data tracking environmental changes.
                </p>
                <div className="text-sm text-primary">Updated weekly</div>
              </div>
              <div className="p-6 bg-accent rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Ocean Temperature Data</h3>
                <p className="text-muted-foreground mb-4">
                  Deep-sea temperature measurements from global monitoring stations.
                </p>
                <div className="text-sm text-primary">Updated monthly</div>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'about' && (
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 card-title">About ClimateAI Predictor</h2>
            <p className="text-muted-foreground mb-6">
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
                <p className="text-sm text-muted-foreground">
                  Our AI models analyze vast amounts of environmental data to predict future climate patterns and their impact on ecosystems.
                </p>
              </div>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  alt="Climate impact"
                  className="rounded-lg object-cover w-full h-64"
                />
                <p className="text-sm text-muted-foreground">
                  We use advanced machine learning algorithms to predict and visualize potential climate change impacts across different regions.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-card border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Steps</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>1. Sign up for an account</li>
                <li>2. Choose your region</li>
                <li>3. Select data metrics</li>
                <li>4. Generate predictions</li>
                <li>5. Export reports</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Documentation</li>
                <li>API Access</li>
                <li>Research Papers</li>
                <li>Case Studies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Knowledge Base</li>
                <li>Video Tutorials</li>
                <li>FAQ</li>
                <li>Community Forum</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Our Updates</h3>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Stay informed about climate predictions and platform updates.</p>
                <div className="flex space-x-4">
                  <a href="https://twitter.com/climateai" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/climateai" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4">© 2025 ClimateAI Predictor</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;