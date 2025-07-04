import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main className='min-h-[78vh]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
