import React, { useState } from 'react';
import { Plus, X, Users, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import './App.css';

const App = () => {
  const [roster, setRoster] = useState([
    { id: 1, name: 'Josh Allen', position: 'QB', team: 'BUF', status: 'active' },
    { id: 2, name: 'Christian McCaffrey', position: 'RB', team: 'SF', status: 'active' },
    { id: 3, name: 'Tyreek Hill', position: 'WR', team: 'MIA', status: 'active' },
  ]);
  
  const [newPlayer, setNewPlayer] = useState({ name: '', position: 'QB', team: '' });
  const [activeTab, setActiveTab] = useState('roster');

  const addPlayer = () => {
    if (newPlayer.name.trim()) {
      setRoster([...roster, {
        id: Date.now(),
        name: newPlayer.name,
        position: newPlayer.position,
        team: newPlayer.team.toUpperCase(),
        status: 'active'
      }]);
      setNewPlayer({ name: '', position: 'QB', team: '' });
    }
  };

  const removePlayer = (id) => {
    setRoster(roster.filter(player => player.id !== id));
  };

  const positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

  const groupedRoster = positions.reduce((acc, pos) => {
    acc[pos] = roster.filter(player => player.position === pos);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Fantasy Football Assistant</h1>
          <p className="text-gray-600">Manage your roster and get AI-powered recommendations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-6 py-4 font-medium flex items-center gap-2 ${
                activeTab === 'roster' 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Users size={20} />
              My Roster
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-4 font-medium flex items-center gap-2 ${
                activeTab === 'recommendations' 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp size={20} />
              AI Recommendations
            </button>
            <button
              onClick={() => setActiveTab('lineup')}
              className={`px-6 py-4 font-medium flex items-center gap-2 ${
                activeTab === 'lineup' 
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Calendar size={20} />
              This Week&apos;s Lineup
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roster Management */}
          {activeTab === 'roster' && (
            <>
              <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Current Roster</h2>
                
                {positions.map(position => (
                  <div key={position} className="mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      {position}
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {groupedRoster[position]?.length || 0}
                      </span>
                    </h3>
                    
                    {groupedRoster[position]?.length > 0 ? (
                      <div className="space-y-2">
                        {groupedRoster[position].map(player => (
                          <div key={player.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div>
                              <span className="font-medium text-gray-800">{player.name}</span>
                              <span className="text-gray-500 ml-2">({player.team})</span>
                            </div>
                            <button
                              onClick={() => removePlayer(player.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 italic p-3 bg-gray-50 rounded-lg">
                        No {position} players added yet
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Player Form */}
              <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Player</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Player Name
                    </label>
                    <input
                      type="text"
                      value={newPlayer.name}
                      onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Patrick Mahomes"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <select
                      value={newPlayer.position}
                      onChange={(e) => setNewPlayer({...newPlayer, position: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {positions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Team
                    </label>
                    <input
                      type="text"
                      value={newPlayer.team}
                      onChange={(e) => setNewPlayer({...newPlayer, team: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., KC"
                      maxLength={3}
                    />
                  </div>
                  
                  <button
                    onClick={addPlayer}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium"
                  >
                    <Plus size={16} />
                    Add Player
                  </button>
                </div>
              </div>
            </>
          )}

          {/* AI Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">AI Recommendations</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-yellow-600 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-yellow-800">Coming Soon!</h3>
                  <p className="text-yellow-700 mt-1">
                    Once you connect your AI model and data sources, this section will show:
                  </p>
                  <ul className="list-disc list-inside text-yellow-700 mt-2 space-y-1">
                    <li>Waiver wire pickup suggestions</li>
                    <li>Trade recommendations</li>
                    <li>Player performance analysis</li>
                    <li>Injury impact assessments</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Lineup Tab */}
          {activeTab === 'lineup' && (
            <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">This Week&apos;s Starting Lineup</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <Calendar className="text-blue-600 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-blue-800">Lineup Optimizer Coming Soon!</h3>
                  <p className="text-blue-700 mt-1">
                    This will help you set your optimal starting lineup based on:
                  </p>
                  <ul className="list-disc list-inside text-blue-700 mt-2 space-y-1">
                    <li>Matchup analysis</li>
                    <li>Weather conditions</li>
                    <li>Injury reports</li>
                    <li>Expert projections</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Data Export Section */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Developer Tools</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Current roster data (JSON format for your AI agent):</p>
            <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
              {JSON.stringify(roster, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
