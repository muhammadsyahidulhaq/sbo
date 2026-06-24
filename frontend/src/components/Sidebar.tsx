import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside
      style={{
        width: '220px',
        borderRight: '1px solid #ddd',
        padding: '20px',
      }}
    >
      <nav>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>

          <br />

          <li>
            <Link to="/members">
              Members
            </Link>
          </li>

          <br />

          <li>
            <Link to="/invites">
              Invites
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}