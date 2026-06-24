import {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  validateInvite,
  joinOrganization,
} from '../../api/invite.service';

export default function JoinOrganizationPage() {
  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [invite,
    setInvite,
  ] = useState<any>(null);

  const [loading,
    setLoading,
  ] = useState(true);

  const loadInvite =
    async () => {
      try {
        const data =
          await validateInvite(
            token!,
          );

        setInvite(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const handleJoin =
    async () => {
      try {
        await joinOrganization(
          token!,
        );

        alert(
          'Berhasil join organisasi',
        );

        navigate(
          '/dashboard',
        );
      } catch (error) {
        console.error(error);

        alert(
          'Gagal join organisasi',
        );
      }
    };

  useEffect(() => {
    loadInvite();
  }, []);

  if (loading) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  if (!invite) {
    return (
      <h2>
        Invite tidak valid
      </h2>
    );
  }

  return (
    <div>
      <h1>
        Join Organization
      </h1>

      <h2>
        {
          invite.organization
            ?.name
        }
      </h2>

      <p>
        {
          invite.organization
            ?.description
        }
      </p>

      <button
        onClick={
          handleJoin
        }
      >
        Join
      </button>
    </div>
  );
}