export const getClient = () => import.meta.env.VITE_CLIENT || 'default';

export const banners: Record<string, string> = {
  default: '',
  google: 'This is a white-label version for Google.',
};