"use client"

import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

interface Inventory {
    id: number;
    name: string;
    url: string;
    category: string;
}
export default function InventoryPage() {

    const [inventoryData, setInventoryData] = useState<Inventory[]>([]);

    // Bearer token for Strapi api
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // Define headers with Authorization
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch inventory with populated data
                const response = await fetch(`http://localhost:1337/api/inventories`, { headers });
                const data = await response.json();

                if (!data.data) {
                    console.error('Inventory not found or error fetching data');
                    return; // Handle case where inventory is not found
                }

                // Extract and format inventory data
                const items = data.data.map((item: any) => ({
                    id: item.id,
                    name: item.attributes.name,
                    url: item.attributes.url,
                    category: item.attributes.category,
                }));

                setInventoryData(items);
            } catch (error) {
                console.error("Error fetching inventory:", error);
            }
        };

        fetchInventory();
    }, []);

    async function handleInventoryView(item: any) {
        const result = await Swal.fire({
            html: `
            <h2>Inventory Details</h2>
            <p><b>Inventory ID:</b> ${item.id}</p>
            <p><b>Name:</b> ${item.name}</p>
            <p><b>URL:</b> ${item.url}</p>
            <p><b>Category:</b> ${item.category}</p><br/>
            <h2 class="swal2-input-label">Bid For Inventory</h2>
            <h3 class="swal2-input-label">Inventory Location</h3>
            <select id="swal-input2" class="swal2-input">
                <option value="Top">Top</option>
                <option value="Side">Side</option>
                <option value="Bottom">Bottom</option>
            </select>
            <h3 class="swal2-input-label">Price per Mille (N$)</h3>
            <input type="number" class="swal2-input" id="swal-input3" required />
            
            `,
            confirmButtonText: 'Bid to Inventory',
            confirmButtonColor: '#111',
            customClass: 'swal-wide',
            preConfirm: () => {
                const location = (document.getElementById('swal-input2') as HTMLInputElement).value;
                const price = (document.getElementById('swal-input3') as HTMLInputElement).value;

                if (!price) {
                    Swal.showValidationMessage('Please fill in all fields');
                }

                return { location, price };
            }
        })

        if (result.isConfirmed) {
            // Display a message if the alert is confirmed
            Swal.fire({
                icon: 'success',
                title: 'Bid Placed!',
                text: 'Your bid has been successfully placed.',
                confirmButtonColor: '#111',
            });
        }
    }

    return (
        <div style={{ padding: "0 20px" }}>
            <div style={{ marginTop: 80 }}>
                <h1>Available Inventory</h1>
            </div>

            {
                inventoryData ? (
                    <div className='inventory-publishers-grid'>
                        {/* Map over the publisherArray to create a card for each publisher */}
                        {inventoryData.map((item) => (
                            <div key={item.id} className="inventory-grid-card" onClick={() => handleInventoryView(item)}>
                                <h2>{item.name}</h2>
                                {/* <p>URL: {item.url}</p> */}
                                <p>Category: {item.category}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No Data Available</div>
                )
            }

        </div>
    )
}
