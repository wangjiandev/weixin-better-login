import localFont from 'next/font/local';

export const geistMono = localFont({
  src: [
    {
      path: '../public/fonts/geist-mono/GeistMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-mono/GeistMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const geist = localFont({
  src: [
    {
      path: '../public/fonts/geist/Geist-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist/Geist-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-geist',
});

export const orbitron = localFont({
  src: [
    {
      path: '../public/fonts/orbitron/Orbitron-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/orbitron/Orbitron-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-orbitron',
});
