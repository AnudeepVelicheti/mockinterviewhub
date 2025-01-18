import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Sidebar />
      <div className="ml-16 p-8">
        <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((job) => (
            <div
              key={job}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">Software Engineer</h3>
              <p className="text-gray-600 text-sm mb-4">
                Tech Corp • San Francisco, CA
              </p>
              <div className="flex justify-between items-center">
                <span className="text-primary">$120k - $180k</span>
                <Button variant="outline">Apply</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;