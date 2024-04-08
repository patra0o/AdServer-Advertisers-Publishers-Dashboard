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
  clicks: string;
}

const AdDataGrid: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<Ads | null>(null);
  const [rows, setRows] = useState<Ads[]>([]);

  const router = useRouter()


  // Bearer token for Strapi api
  const token = '1ffbd20182b2aa2a662c2675bda97e6c1ea51617c499986af421b7aa072018e0859f9e61c212c3c051075e765a057520d151587e5f12903a57da99973a6e1221000af148ff0eb934c5df6bbad67e4762af1aaa9700c316c83754524122a5c3beae7065e85c8df3242cbba85739eb1b42bd8b2bfe87d9519088e3d4c3f48d53e1';

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchAds = async () => {
      try {

        // Define headers with Authorization
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await fetch("http://localhost:1337/api/advertisments", { headers });
        const data = await response.json();
        const ads = data.data.map((ad: any) => ({
          id: ad.id,
          name: ad.attributes.name,
          impressions: ad.attributes.impressions,
          clicks: ad.attributes.clicks,
          status: ad.attributes.status,
        }));
        setRows(ads);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAds();
  }, []); // Empty dependency array ensures this runs once on mount

  // Define columns for the data grid
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "impressions", headerName: "Impressions", flex: 1 },
    { field: "clicks", headerName: "Clicks", flex: 1 },
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

export default AdDataGrid;
