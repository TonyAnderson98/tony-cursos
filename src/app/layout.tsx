import type { Metadata } from 'next';
import './globals.css';
import { Header } from './components/Header';

export const metadata: Metadata = {
    title: 'Tony Cursos',
    description: 'Cursos de TI.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
            </head>
            <body className="font-body antialiased">
                <Header />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
