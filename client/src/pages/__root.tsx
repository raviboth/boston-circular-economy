import { createRootRoute, Outlet } from '@tanstack/react-router'
import { NavBar } from '../components/NavBar/NavBar'
import { PageLayout } from '../components/PageLayout/PageLayout'

const NAV_LINKS = [
  { label: 'Services', to: '/services/' },
  { label: 'Dev', to: '/dev/' },
]

export const Route = createRootRoute({
  component: () => (
    <>
      <NavBar links={NAV_LINKS} />
      <div className="pt-14">
        <PageLayout>
          <Outlet />
        </PageLayout>
      </div>
    </>
  ),
})
