import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'AVIV SEO Toolbox - Multi-brand Back Office',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
