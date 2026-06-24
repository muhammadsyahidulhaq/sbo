import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../api/axios';
import { acceptInvite } from '../../api/invite.service';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [me, setMe] = useState<any>(null);

  const [invites, setInvites] = useState<any[]>([]);

  const load = async () => {
    try {
      setLoading(true);

      const [meRes, inviteRes] =
        await Promise.all([
          api.get('/auth/me'),
          api.get('/invites/my'),
        ]);

      console.log(
        '🔥 ME:',
        meRes.data,
      );

      console.log(
        '🔥 INVITES:',
        inviteRes.data,
      );

      setMe(meRes.data);
      setInvites(inviteRes.data);
    } catch (error) {
      console.error(error);

      alert(
        'Gagal mengambil data onboarding',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (
      me?.memberships &&
      me.memberships.length > 0
    ) {
      navigate('/dashboard');
    }
  }, [me, navigate]);

 const handleAccept = async (id: string) => {
  try {
    await acceptInvite(id);

    alert('Berhasil join organisasi');

    navigate('/dashboard');
  } catch (error: any) {
    console.error(error);

    console.log(
      error?.response?.data,
    );

    alert(
      error?.response?.data?.message ??
      'Gagal menerima invite',
    );
  }
};

  if (loading) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome 👋</h1>

      <p>
        Bergabung dengan organisasi
        yang sudah ada atau buat
        organisasi baru.
      </p>

      <hr />

      <h2>Invite Masuk</h2>

      {invites.length === 0 ? (
        <p>
          Belum ada invite untuk akun
          ini.
        </p>
      ) : (
        invites.map((invite) => (
          <div
            key={invite.id}
            style={{
              border:
                '1px solid #ddd',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <h3>
              {
                invite.organization
                  ?.name
              }
            </h3>

            <p>
              Status:{' '}
              {invite.status}
            </p>

            <button
              onClick={() =>
                handleAccept(
                  invite.id,
                )
              }
            >
              Accept Invite
            </button>
          </div>
        ))
      )}

      <hr />

      <h2>
        Belum punya organisasi?
      </h2>

      <button
        onClick={() =>
          navigate(
            '/organizations/create',
          )
        }
      >
        Create Organization
      </button>
    </div>
  );
}