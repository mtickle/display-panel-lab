import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import ScrollingText from './components/ScrollingText';
import SineWave from './components/SineWave';

// Main App Component
export default function App() {
  return (
    <div className="bg-black text-green-400 font-mono min-h-screen p-4 flex flex-col gap-4">
      {/* Header */}
      <header className="border-2 border-green-500 p-4 flex justify-between items-center shadow-[0_0_15px_rgba(0,255,0,0.5)]">
        <h1 className="text-2xl lg:text-4xl animate-pulse">SYSTEM CONTROL PANEL v2.7.1</h1>
        <div className="flex flex-col items-end text-sm">
          <span>STATUS: <span className="text-red-500 animate-pulse">ONLINE</span></span>
          <span>{new Date().toISOString()}</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">

        {/* Left Column */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="border border-green-500 p-2 flex-1 flex flex-col shadow-[0_0_10px_rgba(0,255,0,0.4)] min-h-0">
            <h2 className="text-center border-b border-green-500 mb-2">FREQUENCY ANALYSIS</h2>
            <div className="flex-1 min-h-0 max-h-64">
              <BarChart />
            </div>
          </div>
          <div className="border border-green-500 p-2 flex-1 flex flex-col shadow-[0_0_10px_rgba(0,255,0,0.4)] min-h-0">
            <h2 className="text-center border-b border-green-500 mb-2">SYSTEM LOGS</h2>
            <div className="flex-1 min-h-0 max-h-52">
              <ScrollingText />
            </div>
          </div>

          <div className="border border-green-500 p-2 shadow-[0_0_10px_rgba(0,255,0,0.4)]">
            <h2 className="text-center border-b border-green-500 mb-2">CORE STATUS</h2>
            <div className="space-y-2 text-sm">
              <p>TEMP: <span className="text-yellow-400">98.6 C</span></p>
              <p>PRESSURE: <span className="text-white">101.3 kPa</span></p>
              <p>POWER DRAW: <span className="text-white">1.21 GW</span></p>
              <div className="flex items-center gap-2">
                <span>SHIELDS:</span>
                <div className="w-full bg-gray-700 h-4 border border-green-600">
                  <div className="bg-green-500 h-full" style={{ width: '88%' }}></div>
                </div>
                <span className="text-white">88%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
            <div className="border border-green-500 p-2 flex flex-col shadow-[0_0_10px_rgba(0,255,0,0.4)]">
              <h2 className="text-center border-b border-green-500 mb-2">ENERGY WAVEFORM</h2>
              <div className="flex-grow h-48 lg:h-auto">
                <SineWave />
              </div>
            </div>
            <div className="border border-green-500 p-2 flex flex-col shadow-[0_0_10px_rgba(0,255,0,0.4)]">
              <h2 className="text-center border-b border-green-500 mb-2">PARTICLE FLUX</h2>
              <div className="flex-grow h-48 lg:h-auto">
                <LineChart />
              </div>
            </div>
          </div>
          <div className="border border-green-500 p-4 text-center shadow-[0_0_10px_rgba(0,255,0,0.4)]">
            <h2 className="text-xl">SYSTEM COMMAND</h2>
            <div className="mt-2 flex gap-2 justify-center">
              <button className="bg-green-700 hover:bg-green-600 border border-green-400 px-4 py-2 shadow-lg transition-all">INITIATE</button>
              <button className="bg-yellow-700 hover:bg-yellow-600 border border-yellow-400 px-4 py-2 shadow-lg transition-all">CALIBRATE</button>
              <button className="bg-red-800 hover:bg-red-700 border border-red-500 px-4 py-2 shadow-lg transition-all animate-pulse">EJECT CORE</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
