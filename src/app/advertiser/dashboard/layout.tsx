import React from 'react'

// Root Layout for advertiser Dashboard
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='advertiser-dashboard-parent'>
            <div className='advertiser-sidebar'>
                <img src='https://via.placeholder.com/90x90'></img>
                <div className='advertiser-sidebar-nav'>
                    <h2>Campaigns</h2>
                    <h2>Inventory</h2>
                    <h2>Reports</h2>
                    <h2>Settings</h2>
                </div>
            </div>
            <div className='advertiser-main-body'>
                <div className='navbar'>
                    <div></div>
                    <div className='nav-user-details'>
                        <h2>John Doe</h2>
                        <img src='https://via.placeholder.com/50x50'></img>
                        <div></div>
                    </div>
                </div><br />
                {children}
            </div>
        </div>
    )
}
