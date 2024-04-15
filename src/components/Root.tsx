import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Root() {
  return (
    <>
      <AppNav />
      <Outlet />
      <Footer />
    </>
  )
}
