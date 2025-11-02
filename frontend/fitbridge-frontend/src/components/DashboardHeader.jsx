export default function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem('user')); // or use context

  return (
    <div className="text-2xl font-bold text-blue-700">
      Welcome back, {user?.name || 'Athlete'}!
    </div>
  );
}