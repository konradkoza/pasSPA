import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'p.lodz.pas',
  appName: 'pas',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },

};

export default config;
