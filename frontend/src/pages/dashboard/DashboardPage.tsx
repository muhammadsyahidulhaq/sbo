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

  const [organization,
    setOrganization,
  ] = useState<any>(null);

  const [members,
    setMembers,
  ] = useState<any[]>([]);

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
      <h2>
        Loading...
      </h2>
    );
  }

  return (
  <DashboardLayout>
    <div>
        
      <h1>
        Dashboard
      </h1>

      <hr />

      <h2>
        {
          organization.name
        }
      </h2>

      <p>
        {
          organization.description
        }
      </p>

      <hr />

      <h3>
        Owner
      </h3>

      <p>
        {
          organization.owner
            ?.name
        }
      </p>

      <hr />

      <h3>
        Jumlah Member
      </h3>

      <p>
        {members.length}
      </p>

      <hr />

      <h3>
        Daftar Member
      </h3>

      {members.map(
        (member) => (
          <div
            key={member.id}
          >
            <p>
              {
                member.user
                  ?.name
              }
              {' - '}
              {
                member.role
                  ?.name
              }
            </p>
          </div>
        ),
      )}
    </div>
  
    </DashboardLayout>
);
}