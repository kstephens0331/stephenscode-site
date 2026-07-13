import type { Metadata } from 'next'
import Gate from './Gate'

export const metadata: Metadata = {
  title: 'MissionReady Partnership Proposal',
  robots: { index: false, follow: false },
}

export default function MissionReadyProposalPage() {
  return <Gate />
}
