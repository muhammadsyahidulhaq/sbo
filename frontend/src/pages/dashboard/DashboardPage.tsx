import {
  useEffect,
  useState,
} from 'react';
import DashboardLayout
from '../../layouts/DashboardLayout';
import {
  getMyOrganizations,
  getOrganizationDetail,
  getOrganizationMembers,
} from '../../api/organization.service';

export default function DashboardPage() {
interface Member {
  id: string;
  user?: {
    name: string;
  };
  role?: {
    name: string;
  };
}

interface Organization {
  id: string;
  name: string;
  description?: string;
  owner?: {
    name: string;
  };
}

  const [organization, setOrganization] =
  useState<Organization | null>(null);

  const [members,
    setMembers,
  ] = useState<Member[]>([]);

  const loadData =
    async () => {
      try {
        const organizations =
          await getMyOrganizations();

        if (
          organizations.length === 0
        ) {
          return;
        }

        const org =
          organizations[0];

        const detail =
          await getOrganizationDetail(
            org.organizationId ??
            org.id,
          );

        const memberList =
          await getOrganizationMembers(
            org.organizationId ??
            org.id,
          );

        setOrganization(
          detail,
        );

        setMembers(
          memberList,
        );
      } catch (error) {
        console.error(error);
      }
    };

    
  useEffect(() => {
   void loadData();
  }, []);

  if (!organization) {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-slate-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

  return (
  <DashboardLayout>
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Welcome back to your organization workspace.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">
              Organization Owner
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {organization.owner?.name}
            </h2>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-6">
            <p className="text-slate-400 text-sm">
              Total Members
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {members.length}
            </h2>
          </div>

        </div>

        {/* Organization Card */}
        <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 mb-8">

          <h2 className="text-2xl font-bold mb-3">
            {organization.name}
          </h2>

          <p className="text-slate-400">
            {organization.description ||
              'No description available'}
          </p>

        </div>

        {/* Members */}
        <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Organization Members
          </h2>

          <div className="space-y-3">

            {members.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center bg-slate-900/60 border border-slate-700 rounded-xl p-4"
              >
                <div>
                  <p className="font-medium">
                    {member.user?.name}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
                  {member.role?.name}
                </span>
              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  </DashboardLayout>
);
}