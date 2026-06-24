import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div>
      <Navbar />

      <div
        style={{
          display: 'flex',
          minHeight:
            'calc(100vh - 60px)',
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: '20px',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}