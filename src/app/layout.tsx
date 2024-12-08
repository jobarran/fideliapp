import { Provider } from '@/components';
import './globals.css';
import { roboto } from '@/config/fonts';
import type { Metadata } from 'next';
import GoogleMapInitializer from '@/components/map/MapInitializer';

export const metadata: Metadata = {
  title: 'FideliApp',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true} className={roboto.className}>
        <GoogleMapInitializer>
            <Provider>
              {children}
            </Provider>
        </GoogleMapInitializer>
      </body>
    </html>
  );
}
