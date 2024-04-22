import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter, GridToolbarExport } from "@mui/x-data-grid";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

// Define the Ad interface
interface Ads {
  id: number;
  name: string;
  status: string;
  impressions: string;
  conversions: number;
  clicks: string;
}

interface AdDataGridProps {
  id: number;
}

export default function AdDataGrid({ id }: AdDataGridProps) {
  const [selectedRow, setSelectedRow] = useState<Ads | null>(null);
  const [rows, setRows] = useState<Ads[]>([]);

  const router = useRouter()


  // Bearer token for Strapi api
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchAds = async (campaignID: number) => {
      try {
        // Define headers with Authorization
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch campaign with populated ads
        const response = await fetch(`http://localhost:1337/api/campaigns/${campaignID}?populate=*`, { headers });
        const data = await response.json();

        if (!data.data) {
          console.error('Campaign not found or error fetching data');
          return; // Handle case where campaign is not found
        }

        // Extract and format ad data
        const ads = data.data.attributes.advertisements.data.map((ad: any) => ({
          id: ad.id,
          name: ad.attributes.name,
          adSize: ad.attributes.adSize, // Assuming adSize is an attribute in the Ad collection
          adArtwork: ad.attributes.adArtwork, // Assuming adArtwork is an attribute with media reference
          description: ad.attributes.description,
          impressions: ad.attributes.impressions,
          clicks: ad.attributes.clicks,
          conversions: ad.attributes.conversions,
          status: ad.attributes.status,
        }));

        setRows(ads);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds(id);
  }, []); // Empty dependency array ensures this runs once on mount

  // Define columns for the data grid
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "impressions", headerName: "Impressions", flex: 1 },
    { field: "clicks", headerName: "Clicks", flex: 1 },
    { field: "conversions", headerName: "Conversions", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  // Function to get a unique row ID
  const getRowId = (row: Ads) => row.id;

  // Custom toolbar component
  const CustomToolbar: React.FC = () => {
    return (
      <GridToolbarContainer className="grid-tool-bar">
        <GridToolbarQuickFilter />
        <GridToolbarExport style={{ color: "#000" }} />
      </GridToolbarContainer>
    );
  };

  // Function to handle row click and display data
  const showData = (params: { row: Ads }) => {
    setSelectedRow(params.row);





    Swal.fire({
      title: "Ad Selected",
      html: `
      <p>Ad ID: ${params.row.id}</p>
      <p>Name: ${params.row.name}</p>
      <p>Start Date: ${params.row.status}</p>
      <p>End Date: ${params.row.impressions}</p>
      <p>Last Updated: ${params.row.clicks}</p>
      `,
      confirmButtonColor: "#000000"
    });
  };

  return (
    <div style={{ height: 400, width: "100%", margin: "0 auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        slots={{
          toolbar: CustomToolbar
        }}
        onRowClick={showData}
      />
    </div>
  );
};

