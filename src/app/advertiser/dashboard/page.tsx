"use client"

import addCampaign from '@/components/addCampaign'
import CampaignDataGrid from '@/components/campaingDataGrid'
import React from 'react'

export default function AdvertiserDashboard() {
    return (
        <div style={{ padding: "0 20px" }}>
            <div className='advertisement-dashboard-header' style={{ marginTop: 70 }}>
                <h1>Your Campaigns</h1>
                <button className='create-button' onClick={addCampaign}>New Campaign</button>
            </div>
            <CampaignDataGrid></CampaignDataGrid>
            <br /><br />
        </div>

    )
}
