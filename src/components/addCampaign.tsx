import Swal from 'sweetalert2';

interface CampaignFormData {
    name: string;
    description: string;
    targetAudience: string;
    budget: number;
    campaignStartDate: string;
    campaignEndDate: string;
    campaignStatus: string;
    targetDevices: string;
    geographicTargeting: string;
    errors: string[];
}

export default async function addCampaign() {
    const token = '1ffbd20182b2aa2a662c2675bda97e6c1ea51617c499986af421b7aa072018e0859f9e61c212c3c051075e765a057520d151587e5f12903a57da99973a6e1221000af148ff0eb934c5df6bbad67e4762af1aaa9700c316c83754524122a5c3beae7065e85c8df3242cbba85739eb1b42bd8b2bfe87d9519088e3d4c3f48d53e1';

    const result = await Swal.fire<CampaignFormData>({
        html:
            '<h2>Campaign Details</h2>' +
            '<h3 class="swal2-input-label">Name</h3>' + '<input id="swal-input1" class="swal2-input">' +
            '<h3 class="swal2-input-label">Short Description</h3>' + '<textarea id="swal-input2" class="swal2-textarea"></textarea>' +
            '<h3 class="swal2-input-label">Target Audience</h3>' + '<input id="swal-input3" class="swal2-input">' +
            '<h3 class="swal2-input-label">Budget (N$)</h3>' + '<input id="swal-input4" type="number" class="swal2-input">' +
            '<h3 class="swal2-input-label">Campaign Start Date</h3>' + '<input id="swal-input5" type="date" class="swal2-input">' +
            '<h3 class="swal2-input-label">Campaign End Date</h3>' + '<input id="swal-input6" type="date" class="swal2-input">' +
            '<h3 class="swal2-input-label">Campaign Status</h3>' + '<input id="swal-input7" class="swal2-input">' +
            '<h3 class="swal2-input-label">Target Devices</h3>' + '<select id="swal-input8" class="swal2-input"><option value="mobile">Mobile Devices</option><option value="tablet">Tablets</option><option value="laptops">Laptops</option></select>' +
            '<h3 class="swal2-input-label">Geographic Targeting</h3>' + '<input id="swal-input9" class="swal2-input">',
        preConfirm: async () => {
            const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
            const description = (document.getElementById('swal-input2') as HTMLInputElement).value;
            const targetAudience = (document.getElementById('swal-input3') as HTMLInputElement).value;
            const budget = parseFloat((document.getElementById('swal-input4') as HTMLInputElement).value);
            const campaignStartDate = (document.getElementById('swal-input5') as HTMLInputElement).value;
            const campaignEndDate = (document.getElementById('swal-input6') as HTMLInputElement).value;
            const campaignStatus = (document.getElementById('swal-input7') as HTMLInputElement).value;
            const targetDevices = (document.getElementById('swal-input8') as HTMLInputElement).value;
            const geographicTargeting = (document.getElementById('swal-input9') as HTMLInputElement).value;

            const errors: string[] = [];

            // Validation logic here...
            if (!name) {
                errors.push('Campaign Name is required');
            }
            if (!description) {
                errors.push('Campaign Description is required');
            }
            if (!targetAudience) {
                errors.push('Target Audience is required');
            }
            if (!budget) {
                errors.push('Budget is required');
            }
            if (!campaignStartDate) {
                errors.push('Campaign Start Date is required');
            }
            if (!campaignEndDate) {
                errors.push('Campaign End Date is required');
            }
            if (!campaignStatus) {
                errors.push('Campaign Status is required');
            }

            if (errors.length) {
                Swal.showValidationMessage(errors.join('<br>'));
                return false;
            }

            const campaignData = {
                name: name,
                description: description,
                targetAudience: targetAudience,
                budget: budget,
                campaignStatus: campaignStatus,
                start: campaignEndDate,
                end: campaignStartDate,
                targetDevices: targetDevices,
                geographicTargeting: geographicTargeting
            }

            // Send data to Strapi API
            const response = await fetch('http://localhost:1337/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({data: campaignData}),
            });

            if (!response.ok) {
                console.error('Error submitting campaign:', await response.text());
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while creating the campaign.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#111',
                });
                return false;
            }

            return campaignData;

        },
        confirmButtonText: 'Create Campaign',
        confirmButtonColor: '#111',
        customClass: 'swal-wide',
    });

    if (result.isConfirmed) {
        // Handle confirmation
        await Swal.fire({
            title: 'Submitted!',
            text: 'Your Campaign has been successfully published.',
            icon: 'success',
            confirmButtonColor: '#000000',
        });
    }
}
