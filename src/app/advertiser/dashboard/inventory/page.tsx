"use client"

import React, { useState, useEffect } from 'react'

interface Inventory {
    id: number;
    name: string;
    url: string;
    category: string;
}
export default function InventoryPage() {

    const [inventoryData, setInventoryData] = useState<Inventory[]>([]);

    // Bearer token for Strapi api
    const token = '1ffbd20182b2aa2a662c2675bda97e6c1ea51617c499986af421b7aa072018e0859f9e61c212c3c051075e765a057520d151587e5f12903a57da99973a6e1221000af148ff0eb934c5df6bbad67e4762af1aaa9700c316c83754524122a5c3beae7065e85c8df3242cbba85739eb1b42bd8b2bfe87d9519088e3d4c3f48d53e1';

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
                            <div key={item.id} className="inventory-grid-card">
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
