import { redirect } from 'next/navigation';
import HomeComponent from './pages/index';

export default function Page() {
  // Using the component directly
  return <HomeComponent />;
  
  // Alternatively, you could use redirect:
  // redirect('/pages');
}
