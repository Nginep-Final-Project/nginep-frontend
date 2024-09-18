import type { Metadata } from 'next'
import DashboardSidebar from './_components/DashboardSidebar/DashboardSidebar'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Nginep - Dashboard',
  description:
    'The dashboard for tenant managements on properties and bookings',
}

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <DashboardSidebar>
      <section>{children}</section>
      <Toaster />
    </DashboardSidebar>
  )
}
