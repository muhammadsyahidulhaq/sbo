import { useEffect, useState } from 'react';

import DashboardLayout from '../../layouts/DashboardLayout';

import {
  createInvite,
} from '../../api/invite.service';

import api from '../../api/axios';

import {
  getMyOrganizations,
} from '../../api/organization.service';

export default function InvitesPage() {
  const [email, setEmail] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [invites, setInvites] =
    useState<any[]>([]);

  const loadInvites =
    async () => {
      try {
        const res =
          await api.get(
            '/invites/my',
          );

        setInvites(
          res.data,
        );
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadInvites();
  }, []);

  const handleInvite =
    async () => {
      try {
        setLoading(true);

        const organizations =
          await getMyOrganizations();

        const orgId =
          organizations[0]
            ?.organizationId ??
          organizations[0]?.id;

        await createInvite(
          orgId,
          email,
        );

        alert(
          'Invite berhasil dikirim',
        );

        setEmail('');

        loadInvites();
      } catch (error) {
        console.error(error);

        alert(
          'Gagal mengirim invite',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <DashboardLayout>
      <h1>Invites</h1>

      <div>
        <input
          type="email"
          placeholder="Email user"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value,
            )
          }
        />

        <button
          onClick={
            handleInvite
          }
          disabled={
            loading
          }
        >
          {loading
            ? 'Sending...'
            : 'Invite User'}
        </button>
      </div>

      <hr />

      <h2>
        Invite Saya
      </h2>

      {invites.length === 0 ? (
        <p>
          Belum ada invite
        </p>
      ) : (
        invites.map(
          (invite) => (
            <div
              key={
                invite.id
              }
            >
              <p>
                Email:{' '}
                {
                  invite.email
                }
              </p>

              <p>
                Status:{' '}
                {
                  invite.status
                }
              </p>

              <p>
                Org:{' '}
                {
                  invite
                    .organization
                    ?.name
                }
              </p>

              <hr />
            </div>
          ),
        )
      )}
    </DashboardLayout>
  );
}