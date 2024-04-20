import React from 'react'
import Link from 'next/link'

export default function PublisherDashboard() {
    return (
        <div className='publisher-dashboard-parent'>
            <div className='publisher-navbar'>
                <img src='/dynamic-rockets-logo.png' height={70} width={70}></img>

                <div className='dropdown'>
                    <a href='#' style={{ textDecoration: 'none' }}><span>My account</span></a>
                    <div className="dropdown-content">
                        <Link href='/publisher/dashboard/my-account'>Profile</Link>
                        <Link href='/'>Log-out</Link>
                    </div>
                </div>
            </div>
            <div className='publisher-main-body'>
                <div className="publisher-main-body-nav">
                    <h2>Dashboard</h2>
                    <h2>Bids</h2>
                </div>
                <div className="highlightContainer">
                    <div className="highlightItem">
                        <h1><img src='/eye.png' height={40} width={40} style={{ margin: "0 10px" }} />34.1k</h1>
                        <h3>Views</h3>
                    </div>
                    <div className="highlightItem">
                        <h1><img src='/click.png' height={40} width={40} style={{ margin: "0 10px" }} />9.7k</h1><br />
                        <h3>Clicks</h3>
                    </div>
                    <div className="highlightItem">
                        <h1><img src='/bidding.png' height={40} width={40} style={{ margin: "0 10px" }} />15</h1>
                        <h3>Bids</h3>
                    </div>
                    <div className="highlightItem">
                        <h1><img src='/money.png' height={40} width={40} style={{ margin: "0 10px" }} />N$10.9K</h1>
                        <h3>Income</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
