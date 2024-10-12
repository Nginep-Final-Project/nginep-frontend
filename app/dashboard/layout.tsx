import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import DashboardSidebar from './_components/DashboardSidebar/DashboardSidebar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Nginep - Dashboard',
  description:
    'The dashboard for tenant managements on properties and bookings',
}

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <DashboardSidebar>
        <section>{children}</section>
        <Toaster />
      </DashboardSidebar>
      <Footer />
    </div>
  )
}
