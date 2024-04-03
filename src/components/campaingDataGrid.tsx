import React, { useState } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter, GridToolbarExport } from "@mui/x-data-grid";
import Swal from "sweetalert2";

interface Campaign {
  id: number;
  name: string;
  start: string;
  end: string;
  updated: string;
}

const CampaignDataGrid: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<Campaign | null>(null);

  // Dummy data for campaigns
  const rows: Campaign[] = [
    { id: 1, name: "Campaign 1", start: "04/04/2024", end: "04/08/2024", updated: "04/04/2024" },
    { id: 2, name: "Campaign 2", start: "01/04/2024", end: "04/05/2024", updated: "Never" },
    { id: 3, name: "Campaign 3", start: "28/03/2024", end: "04/10/2024", updated: "06/04/2024" },
    { id: 4, name: "Campaign 1", start: "04/04/2024", end: "04/08/2024", updated: "04/04/2024" },
    { id: 5, name: "Campaign 2", start: "01/04/2024", end: "04/05/2024", updated: "Never" },
    { id: 6, name: "Campaign 3", start: "28/03/2024", end: "04/10/2024", updated: "06/04/2024" },
    { id: 7, name: "Campaign 1", start: "04/04/2024", end: "04/08/2024", updated: "04/04/2024" },
    { id: 8, name: "Campaign 2", start: "01/04/2024", end: "04/05/2024", updated: "Never" },
    { id: 9, name: "Campaign 3", start: "28/03/2024", end: "04/10/2024", updated: "06/04/2024" },
    { id: 10, name: "Campaign 1", start: "04/04/2024", end: "04/08/2024", updated: "04/04/2024" },
    { id: 11, name: "Campaign 2", start: "01/04/2024", end: "04/05/2024", updated: "Never" },
    { id: 12, name: "Campaign 3", start: "28/03/2024", end: "04/10/2024", updated: "06/04/2024" },
  ];

  // Define columns for the data grid
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "start",
      headerName: "Start",
      flex: 1,
    },
    {
      field: "end",
      headerName: "End",
      flex: 1,
    },
    {
      field: "updated",
      headerName: "Updated",
      flex: 1,
    },
  ];

  const getRowId = (row: Campaign) => row.id;

  // Toolbar Component
  const CustomToolbar: React.FC = () => {
    return (
      <GridToolbarContainer className="grid-tool-bar">
        <GridToolbarQuickFilter />
        <GridToolbarExport style={{ color: "#000" }} />
      </GridToolbarContainer>
    );
  };

  const showData = (params: { row: Campaign }) => {
    setSelectedRow(params.row);
    // Modify as needed for displaying data
    console.log("Selected Row Data:", params.row);

    Swal.fire({
      title: "Campaign Selected",
      html: `
      <p>Campaign ID: ${params.row.id}</p>
      <p>Name: ${params.row.name}</p>
      <p>Start Date: ${params.row.start}</p>
      <p>End Date: ${params.row.end}</p>
      <p>Last Updated: ${params.row.updated}</p>
      `,
      confirmButtonColor: "#000000"
    })
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
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
