import { useEffect, useState } from 'react';

import DashboardLayout from '../../layouts/DashboardLayout';

import api from '../../api/axios';

import {
  createInvite,
  acceptInvite,
} from '../../api/invite.service';

import {
  getMyOrganizations,
} from '../../api/organization.service';

export default function InvitesPage() {
  const [email, setEmail] = useState('');

  const [invites, setInvites] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const loadInvites = async () => {
    try {
      const res = await api.get('/invites/my');
      setInvites(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  // CREATE INVITE (EMAIL)
  const handleInvite = async () => {
    try {
      setLoading(true);

      const orgs = await getMyOrganizations();

      const orgId = orgs[0].organizationId ?? orgs[0].id;

      await createInvite(orgId, email);

      alert('Invite berhasil dikirim');

      setEmail('');

      loadInvites();
    } catch (error) {
      console.error(error);
      alert('Gagal invite');
    } finally {
      setLoading(false);
    }
  };

  // ACCEPT INVITE
  const handleAccept = async (id: string) => {
    try {
      await acceptInvite(id);

      alert('Berhasil join organisasi');

      loadInvites();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1>Invites</h1>

      {/* INPUT EMAIL */}
      <div>
        <input
          type="email"
          placeholder="email user yang diinvite"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleInvite} disabled={loading}>
          {loading ? 'Sending...' : 'Invite User'}
        </button>
      </div>

      <hr />

      {/* LIST INVITE */}
      <h3>Daftar Invite</h3>

      {invites.length === 0 ? (
        <p>Belum ada invite</p>
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
            <p>
              Email: <b>{invite.email}</b>
            </p>

            <p>
              Organization: {invite.organization?.name}
            </p>

            <p>Status: {invite.status}</p>

            {invite.status === 'PENDING' && (
              <button onClick={() => handleAccept(invite.id)}>
                Accept
              </button>
            )}
          </div>
        ))
      )}
    </DashboardLayout>
  );
}