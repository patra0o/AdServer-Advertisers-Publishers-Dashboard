import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter, GridToolbarExport } from "@mui/x-data-grid";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

// Define the Campaign interface
interface Campaign {
  id: number;
  name: string;
  start: string;
  end: string;
  updated: string;
}

const CampaignDataGrid: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<Campaign | null>(null);
  const [rows, setRows] = useState<Campaign[]>([]);

  const router = useRouter()


  // Bearer token for Strapi api
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {

        // Define headers with Authorization
        const headers = { 'Authorization': `Bearer ${token}` };

        const response = await fetch("http://localhost:1337/api/campaigns", { headers });
        const data = await response.json();
        const campaigns = data.data.map((campaign: any) => ({
          id: campaign.id,
          name: campaign.attributes.name,
          start: campaign.attributes.start,
          end: campaign.attributes.end,
          updated: campaign.attributes.updatedAt,
        }));
        setRows(campaigns);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCampaigns();
  }, []); // Empty dependency array ensures this runs once on mount

  // Define columns for the data grid
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "start", headerName: "Start", flex: 1 },
    { field: "end", headerName: "End", flex: 1 },
    { field: "updated", headerName: "Updated", flex: 1 },
  ];

  // Function to get a unique row ID
  const getRowId = (row: Campaign) => row.id;

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
  const showData = (params: { row: Campaign }) => {
    setSelectedRow(params.row);





    // Swal.fire({
    //   title: "Campaign Selected",
    //   html: `
    //   <p>Campaign ID: ${params.row.id}</p>
    //   <p>Name: ${params.row.name}</p>
    //   <p>Start Date: ${params.row.start}</p>
    //   <p>End Date: ${params.row.end}</p>
    //   <p>Last Updated: ${params.row.updated}</p>
    //   `,// Construct the query string with individual properties of the row
    const queryString = new URLSearchParams({
      id: params.row.id.toString(),
      name: params.row.name,
      start: params.row.start,
      end: params.row.end,
      updated: params.row.updated,
    }).toString();

    // Navigate to the dynamic page with the query string
    router.push(`/advertiser/dashboard/campaign?${queryString}`);
    //   confirmButtonColor: "#000000"
    // });
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

export default CampaignDataGrid;
