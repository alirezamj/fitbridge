import Layout from '../layout/Layout';
import DashboardHeader from '../components/DashboardHeader';
import DashboardStats from '../components/DashboardStats';
import DashboardFeed from '../components/DashboardFeed';












export default function Dashboard() {
  return (
    <Layout>
      <div className="p-6 space-y-6">
        <DashboardHeader />
        <DashboardStats />
        <DashboardFeed />
      </div>
    </Layout>
  );
}
