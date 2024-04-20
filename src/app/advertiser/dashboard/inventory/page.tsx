import React from 'react'

const publishers = {
    publisher1: {
        id: 1,
        name: "Total"
    },
    publisher2: {
        id: 2,
        name: "Engine"
    },
    publisher3: {
        id: 3,
        name: "Puma"
    }, publisher4: {
        id: 1,
        name: "Total"
    },
    publisher5: {
        id: 2,
        name: "Engine"
    },
    publisher6: {
        id: 3,
        name: "Puma"
    },
}
export default function InventoryPage() {
    const publisherArray = Object.values(publishers);

    return (
        <div style={{ padding: "0 20px" }}>
            <div style={{ marginTop: 80 }}>
                <h1>Available Inventory</h1>
            </div>
            <div className='inventory-publishers-grid'>
                {/* Map over the publisherArray to create a card for each publisher */}
                {publisherArray.map((publisher) => (
                    <div key={publisher.id} className="card" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <h2>{publisher.name}</h2>
                        <p>ID: {publisher.id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
