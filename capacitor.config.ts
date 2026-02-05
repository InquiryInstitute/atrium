import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'org.inquiryinstitute.atrium',
  appName: 'Atrium',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
