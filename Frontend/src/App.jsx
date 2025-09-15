// ✅ todos los imports van al principio
import { useState, useEffect } from 'react';
import AppRoutes from './Routes/AppRoutes';

function App() {
  // puedes usar tus hooks acá
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Componente montado');
  }, []);

  return <AppRoutes />;
}

export default App;
