import { useEffect, useState } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../layouts/DashboardLayout';

export default function MembersPage() {
  interface Member {
  id: string;
  user?: {
    name: string;
  };
  role?: {
    name: string;
  };
}
const [members, setMembers] =
  useState<Member[]>([]);

  const load = async () => {
    const res = await api.get('/auth/me');

    const org = res.data.memberships?.[0]?.organization;

    setMembers(org?.memberships || []);
  };

  
  useEffect(() => {
   void load();
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