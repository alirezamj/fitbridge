export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-600">FitBridge</h1>
      <nav className="space-x-6 hidden md:flex">
        <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
        <a href="/login" className="text-gray-600 hover:text-blue-600">Login</a>
        <a href="/register" className="text-gray-600 hover:text-blue-600">Register</a>
      </nav>
    </header>
  );
}