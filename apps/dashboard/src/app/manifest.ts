import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Phantom AI — The Synthetic Reality Engine',
    short_name: 'Phantom',
    description: 'Achieve PMF Velocity 100x faster with AI Ghosts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1117',
    theme_color: '#ea580c',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
