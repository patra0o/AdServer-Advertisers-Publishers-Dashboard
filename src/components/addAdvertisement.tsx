import Swal from 'sweetalert2';

interface adFormData {
    name: string;
    adSize: string;
    adArtwork: File;
    description: string;
    errors: string[];
}
interface AdDataGridProps {
    adCampaignID: number;
  }

export default async function addAdvertisement({ adCampaignID }:AdDataGridProps) {
    const token = '1ffbd20182b2aa2a662c2675bda97e6c1ea51617c499986af421b7aa072018e0859f9e61c212c3c051075e765a057520d151587e5f12903a57da99973a6e1221000af148ff0eb934c5df6bbad67e4762af1aaa9700c316c83754524122a5c3beae7065e85c8df3242cbba85739eb1b42bd8b2bfe87d9519088e3d4c3f48d53e1';

    const result = await Swal.fire<adFormData>({
        // title: 'Add New RFQ',
        html:
            '<h2>Advertisement Details</h2>' +
            '<h3 class="swal2-input-label">Name</h3>' + '<input id="swal-input1" class="swal2-input" required>' +
            '<h3 class="swal2-input-label">Ad Size</h3>' + '<select id="swal-input2" class="swal2-input"><option value="Square">Square (512x512)</option><option value="Long">Long</option><option value="Video">Video</option></select>' +
            '<h3 class="swal2-input-label">Ad Artwork</h3>' + '<label for="file-upload" class="file-upload-label"><span class="file-upload-text">Choose File</span><input id="file-upload" type="file" name="filename" class="file-upload-input"></label>' +
            '<h3 class="swal2-input-label">Short Description</h3>' + '<textarea id="swal-input4" class="swal2-textarea"></textarea>',

        preConfirm: async () => {
            const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
            const adSize = (document.getElementById('swal-input2') as HTMLInputElement).value;
            const adArtwork = (document.getElementById('file-upload') as HTMLInputElement).value;
            const description = (document.getElementById('swal-input4') as HTMLInputElement).value;
            const errors: string[] = [];

            if (!name) {
                errors.push('Ad Name is required');
            }
            if (!adSize) {
                errors.push('Ad Size is required');
            }
            if (!adArtwork) {
                errors.push('Ad Artwork is required');
            }
            if (!description) {
                errors.push('Short description is required');
            }

            if (errors.length) {
                Swal.showValidationMessage(errors.join('<br>'));
                return false;
            }

            const adData = {
                name: name,
                adSize: adSize,
                artwork: adArtwork,
                description: description,
                campaign: adCampaignID,
                status: "posted",
                impressions: 0,
                clicks: 0,
                conversions: 0
            };

            // Send data to Strapi API
            const response = await fetch('http://localhost:1337/api/advertisments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({data: adData}),
            });
        },
        confirmButtonText: 'Post Advertisement',
        confirmButtonColor: '#111',
        customClass: 'swal-wide',
    });

    if (result.isConfirmed) {
        await Swal.fire({
            title: 'Submitted!',
            text: 'Your Ad has been successfully published.',
            icon: 'success',
            confirmButtonColor: '#000000',
        });
    }
}
