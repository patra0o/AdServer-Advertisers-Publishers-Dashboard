import React from 'react'
import Link from 'next/link';

// Root Layout for advertiser Dashboard
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='advertiser-dashboard-parent'>
            <div className='advertiser-sidebar'>
                <div className='advertiser-sidebar-column'>
                    <img src='/dynamic-rockets-logo.png'></img>
                    <div className='advertiser-sidebar-nav'>
                        <h3><Link href="/advertiser/dashboard/" style={{textDecoration: "none", color: "#fff"}}>Campaigns</Link></h3>
                        <h3><Link href="/advertiser/dashboard/inventory" style={{textDecoration: "none", color: "#fff"}}>Inventory</Link></h3>
                        {/* <h3>Reports</h3> */}
                        <h3>Settings</h3>
                    </div>
                </div>
                <div></div>
            </div>
            <div className='advertiser-main-body'>
                <div className='navbar'>
                    <div></div>
                    <div className='dropdown'>
                        <a href='#' style={{ textDecoration: 'none' }}><span>My account</span></a>
                        <div className="dropdown-content">
                            <Link href='/advertiser/dashboard/my-account'>Profile</Link>
                            <Link href='/'>Log-out</Link>
                        </div>
                    </div>
                </div><br />
                {children}
            </div>
        </div>
    )
}
