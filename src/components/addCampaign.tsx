import Swal from 'sweetalert2';

interface CampaignFormData {
    name: string;
    description: string;
    targetAudience: string;
    budget: number;
    campaignStartDate: string;
    campaignEndDate: string;
    campaignStatus: string;
    targetDevices: string[];
    geographicTargeting: string[];
    errors: string[];
}

export default async function addCampaign() {
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
        preConfirm: () => {
            const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
            const description = (document.getElementById('swal-input2') as HTMLInputElement).value;
            const targetAudience = (document.getElementById('swal-input3') as HTMLInputElement).value;
            const budget = parseFloat((document.getElementById('swal-input4') as HTMLInputElement).value);
            const campaignStartDate = (document.getElementById('swal-input5') as HTMLInputElement).value;
            const campaignEndDate = (document.getElementById('swal-input6') as HTMLInputElement).value;
            const campaignStatus = (document.getElementById('swal-input7') as HTMLInputElement).value;
            const targetDevices = (document.getElementById('swal-input8') as HTMLInputElement).value.split(',');
            const geographicTargeting = (document.getElementById('swal-input9') as HTMLInputElement).value.split(',');
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

            return {
                name,
                description,
                targetAudience,
                budget,
                campaignStatus,
                targetDevices,
                geographicTargeting,
                errors,
            };
        },
        confirmButtonText: 'Create Campaign',
        confirmButtonColor: '#111',
        customClass: 'swal-wide',
    });

    if (result.isConfirmed) {
        // Handle confirmation
        await Swal.fire({
            title: 'Submitted!',
            text: 'Your Ad has been successfully published.',
            icon: 'success',
            confirmButtonColor: '#000000',
        });
    }
}
