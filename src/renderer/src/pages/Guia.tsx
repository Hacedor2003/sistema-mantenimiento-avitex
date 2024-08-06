/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout';

const Guia = () => {
  return (
    <RootLayout>
      <main className="w-full h-full flex flex-col items-center">
        <h2>Guia:</h2>

        <iframe 
          src="../../guia.html" 
          style={{ width: '100%', height: '100%' }} // Ajusta el tamaño según sea necesario
          frameBorder="0"
          title="Guía"
        ></iframe>
      </main>
    </RootLayout>
  );
}

export default Guia;
