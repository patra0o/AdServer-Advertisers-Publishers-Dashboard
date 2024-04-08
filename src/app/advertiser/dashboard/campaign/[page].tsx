"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import AdDataGrid from '@/components/adDataGrid'

export default function CampaignPage() {

  // Extracting campaign data from the query parameters
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const updated = searchParams.get('updated')

  return (
    <div style={{ padding: "0 20px" }}>
      <h1>{name}</h1>

      <div className="highlightContainer">
        <div className="highlightItem">
          <h1><img src='/eye.png' height={40} width={40} style={{ margin: "0 10px" }} />12.5k</h1>
          <h3>Impressions</h3>
        </div>
        <div className="highlightItem">
          <h1><img src='/click.png' height={40} width={40} style={{ margin: "0 10px" }} />3.1k</h1><br />
          <h3>Clicks</h3>
        </div>
        <div className="highlightItem">
          <h1><img src='/click-through-rate.png' height={40} width={40} style={{ margin: "0 10px" }} />24.8%</h1>
          <h3>Click Through Rate</h3>
        </div>
        <div className="highlightItem">
          <h1><img src='/conversion.png' height={40} width={40} style={{ margin: "0 10px" }} />792</h1>
          <h3>Conversions</h3>
        </div>
      </div><br />

      <div className='advertisement-dashboard-header'>
        <h2>Advertisements</h2>
        <button>New Advertisement</button>
      </div>
      <AdDataGrid></AdDataGrid>
    </div>
  )
}
