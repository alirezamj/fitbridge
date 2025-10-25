export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-6">FitBridge</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Overview</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Workouts</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Nutrition</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Progress</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p className="text-gray-600">Here you’ll see your fitness stats, logs, and progress charts.</p>
      </main>
    </div>
  );
}