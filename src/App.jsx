import BarChart from './components/BarChart';
import CoreStatus from './components/CoreStatus';
import LineChart from './components/LineChart';
import ScrollingText from './components/ScrollingText';
import SineWave from './components/SineWave';

// Main App Component
export default function App() {
  return (
    <div className="bg-black text-green-400 font-mono min-h-screen p-4 flex flex-col gap-4">
      {/* Header */}
      <header className="border-2 border-green-500 p-4 flex justify-between items-center shadow-[0_0_15px_rgba(0,255,0,0.5)]">
        <h1 className="text-2xl lg:text-4xl animate-pulse">_SYSTEM_CONTROL_PANEL_2.7.1_</h1>
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
            <h2 className="text-center border-b border-green-500 mb-2">_GALACTIC_FREQUENCY_ANALYSIS_</h2>
            <div className="flex-1 min-h-0 max-h-64">
              <BarChart />
            </div>
          </div>
          <div className="border border-green-500 p-2 flex-1 flex flex-col shadow-[0_0_10px_rgba(0,255,0,0.4)] min-h-0">
            <h2 className="text-center border-b border-green-500 mb-2">_SYSLOG_</h2>
            <div className="flex-1 min-h-0 max-h-56">
              <ScrollingText />
            </div>
          </div>

          <div className="border border-green-500 p-2 shadow-[0_0_10px_rgba(0,255,0,0.4)]">
            <h2 className="text-center border-b border-green-500 mb-2">_CORE_STATUS_</h2>
            <CoreStatus />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
            <div className="border border-green-500 p-2 flex flex-col shadow-[0_0_10px_rgba(0,255,0,0.4)]">
              <h2 className="text-center border-b border-green-500 mb-2">_ENERGY_ECHO_WAVE_MONITOR_</h2>
              <div className="flex-grow h-48 lg:h-auto">
                <SineWave />
              </div>
            </div>
            <div className="border border-green-500 p-2 flex flex-col shadow-[0_0_10px_rgba(0,255,0,0.4)]">
              <h2 className="text-center border-b border-green-500 mb-2">_PARTICLE_FLUX_RATE_</h2>
              <div className="flex-grow h-48 lg:h-auto">
                <LineChart />
              </div>
            </div>
          </div>
          <div className="border border-green-500 p-4 text-center shadow-[0_0_10px_rgba(0,255,0,0.4)]">
            <h2 className="text-xl">_SYSTEM_COMMAND_</h2>
            <div className="mt-2 flex gap-2 justify-center">
              <button className="bg-orange-700 hover:bg-orange-600 border border-orange-400 px-4 py-2 shadow-lg transition-all animate-pulse">GENERATE</button>
              <button className="bg-blue-700 hover:bg-blue-600 border border-blue-400 px-4 py-2 shadow-lg transition-all">STAND BY</button>
              <button className="bg-green-700 hover:bg-green-600 border border-green-400 px-4 py-2 shadow-lg transition-all">INITIATE</button>
              <button className="bg-yellow-700 hover:bg-yellow-600 border border-yellow-400 px-4 py-2 shadow-lg transition-all">CALIBRATE</button>
              <button className="bg-red-800 hover:bg-red-700 border border-red-500 px-4 py-2 shadow-lg transition-all animate-pulse">LOW BATT</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
