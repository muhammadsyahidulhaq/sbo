import { useEffect, useState } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);

  const load = async () => {
    const res = await api.get('/auth/me');

    const org = res.data.memberships?.[0]?.organization;

    setMembers(org?.memberships || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <DashboardLayout>
    <div>
      <h1>Members</h1>

      {members.map((m) => (
        <div key={m.id}>
          <p>{m.user?.name}</p>
          <p>{m.role?.name}</p>
        </div>
      ))}
    </div>
  </DashboardLayout>
);
}