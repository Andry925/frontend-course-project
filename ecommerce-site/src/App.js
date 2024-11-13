import { Container } from 'react-bootstrap'

import Header from './components/Header'
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';



function App() {
  return (
    <div>
      <Header />
     <main className='py-3'>
      <Container>
      <HomeScreen />
      <h1>Welcome to my technical store</h1>
      </Container>
  
     </main>
      <Footer />
    </div>
  );
}

export default App;
