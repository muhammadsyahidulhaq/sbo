import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  createOrganization,
} from '../../api/organization.service';

export default function CreateOrganizationPage() {
  const navigate = useNavigate();

  const [name, setName] =
    useState('');

  const [description,
    setDescription,
  ] = useState('');

  const [loading,
    setLoading,
  ] = useState(false);

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        await createOrganization({
          name,
          description,
        });

        navigate('/dashboard');
      } catch (error) {
        console.error(error);

        alert(
          'Gagal membuat organisasi',
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <h1>
        Buat Organisasi
      </h1>

      <input
        type="text"
        placeholder="Nama organisasi"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value,
          )
        }
      />

      <br />
      <br />

      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value,
          )
        }
      />

      <br />
      <br />

      <button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? 'Loading...'
          : 'Simpan'}
      </button>
    </div>
  );
}