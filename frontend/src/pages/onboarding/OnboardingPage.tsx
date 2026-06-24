import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../api/axios';

import {
  acceptInvite,
} from '../../api/invite.service';

export default function OnboardingPage() {
  const [invites, setInvites] = useState<any[]>([]);
  const navigate = useNavigate();

  const loadInvites = async () => {
    try {
      const res = await api.get('/invites/my');
      setInvites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await acceptInvite(id);

      alert('Berhasil join organisasi');

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Onboarding</h1>

      {/* INVITE SECTION */}
      <h2>Invite Masuk</h2>

      {invites.length === 0 ? (
        <p>Tidak ada invite</p>
      ) : (
        invites.map((invite) => (
          <div
            key={invite.id}
            style={{
              border: '1px solid #ddd',
              padding: 10,
              marginBottom: 10,
            }}
          >
            <h3>{invite.organization?.name}</h3>
            <p>Status: {invite.status}</p>

            {invite.status === 'PENDING' && (
              <button onClick={() => handleAccept(invite.id)}>
                Accept
              </button>
            )}
          </div>
        ))
      )}

      <hr />

      {/* CREATE ORGANIZATION SECTION */}
      <h2>Buat Organisasi</h2>

      <button onClick={() => navigate('/organizations/create')}>
        Create Organization
      </button>
    </div>
  );
}