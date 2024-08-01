// pages/index.tsx

import PropertyGrid from '../app/components/PropertyGrid';
import Header from './components/Header';

import 'react-toastify/dist/ReactToastify.css';



const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <PropertyGrid />
    </div>
  );
};

export default HomePage;
