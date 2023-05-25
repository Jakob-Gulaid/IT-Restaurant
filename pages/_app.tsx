import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { SidebarItem } from '.'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <NavBar>
  <Component {...pageProps} />
  </NavBar>
  </>
}

function NavBar({children}:{children:JSX.Element}) {
  return(

  
  <div className="drawer">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
    <div className="drawer-content flex flex-col">
      <div className="w-full navbar bg-warning-content sticky">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-neutral-content "
            >
            <path strokeLinecap ="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div> 
        <li><Link href="." className='flex-1 px-2 mx-2 text-neutral-content text-2xl justify-center lg:justify-between'>Navn</Link></li>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            {/* <!-- Navbar menu content here --> */}
            <li><Link href="add_new" className="text-neutral-content hover:bg-primary-focus rounded-md mr-16 flex">Skriv en annmeldelse</Link></li>
          </ul>
        </div>
      </div>
      {/* <!-- Page content here --> */}
      {children}
      <div className="w-screen h-full bg-base-100"></div>
    </div> 
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
      <ul className="menu p-4 w-80 bg-base-100">
        {/* <!-- Sidebar content here --> */}
        <SidebarItem text="skriv en annmeldelse" link="/add_new"/> 
        <SidebarItem text="ikke noe her foreløpig" link=""/> 
        
      </ul>
      
    </div>
  </div>

  

  )
}
