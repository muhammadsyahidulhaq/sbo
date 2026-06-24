import DashboardLayout
from '../../layouts/DashboardLayout';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function MembersPage() {



  const [members, setMembers] = useState<any[]>([]);

  const loadMembers = async () => {
    try {
      const res = await api.get('/auth/me');

      const org =
        res.data.memberships?.[0]?.organization;

      setMembers(org?.memberships || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <DashboardLayout>
      

    <div style={{ padding: 20 }}>
      <h1>Members</h1>

      {members.length === 0 ? (
        <p>Belum ada member</p>
      ) : (
        members.map((m) => (
          <div key={m.id}>
            <p>{m.user?.name}</p>
            <p>{m.role?.name}</p>
          </div>
        ))
      )}
    </div>
  
    </DashboardLayout>
  );
}