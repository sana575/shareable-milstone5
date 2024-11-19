document.getElementById('resumeForm')?.addEventListener('submit', function (event: Event) {
    event.preventDefault(); // Prevent default form submission

    // Get form elements
    const usernameElement = document.getElementById('username') as HTMLInputElement | null;
    const nameElement = document.getElementById('name') as HTMLInputElement | null;
    const emailElement = document.getElementById('email') as HTMLInputElement | null;
    const phoneElement = document.getElementById('phone') as HTMLInputElement | null;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement | null;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement | null;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement | null;
    const imageInput = document.getElementById('imageInput') as HTMLInputElement | null;

    // Validate if all required fields are present
    if (
        usernameElement &&
        nameElement &&
        emailElement &&
        phoneElement &&
        educationElement &&
        experienceElement &&
        skillsElement &&
        imageInput
    ) {
        const username = usernameElement.value;
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

        // Handle profile image upload
        const imageFile = imageInput.files ? imageInput.files[0] : null; // Get the selected image file
        const reader = new FileReader();

        // Once the image is loaded, update the profile image element
        reader.onloadend = function () {
            const profileImageElement = document.getElementById('profileImage') as HTMLImageElement | null;

            if (profileImageElement) {
                profileImageElement.src = reader.result as string; // Set the image source to the uploaded image
            }
        };

        // If an image file is selected, read it as a Data URL (base64 encoded)
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }

        // Create the resume output HTML with a shareable link and download button
        const resumeOutput = `
            <h2>Resume</h2>
            <img id="profileImage" src="${imageFile ? reader.result : ''}" alt="Profile Image" />
            <p><strong>Username:</strong> <span class="editable" contenteditable="true">${username}</span></p>
            <p><strong>Name:</strong> <span class="editable" contenteditable="true">${name}</span></p>
            <p><strong>Email:</strong> <span class="editable" contenteditable="true">${email}</span></p>
            <p><strong>Phone:</strong> <span class="editable" contenteditable="true">${phone}</span></p>
            <h3>Education</h3>
            <p><span class="editable" contenteditable="true">${education}</span></p>
            <h3>Experience</h3>
            <p><span class="editable" contenteditable="true">${experience}</span></p>
            <h3>Skills</h3>
            <p><span class="editable" contenteditable="true">${skills}</span></p>
            
            <h3>Shareable Resume Link:</h3>
            <p><a href="https://www.example.com/${username}" target="_blank">Click here to view your resume</a></p>

            <!-- Download Button -->
            <button id="downloadBtn" onclick="downloadResume()">Download Resume</button>
        `;

        // Get the resume output element and set its inner HTML
        const resumeOutputElement = document.getElementById('resumeOutput') as HTMLElement | null;
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
        }
    } else {
        console.error('One or more form elements are missing');
    }
});

// Function to download the resume
function downloadResume(): void {
    const resumeContent = document.getElementById('resumeOutput')?.innerHTML;
    if (resumeContent) {
        const blob = new Blob([resumeContent], { type: 'text/html' }); // Type updated to 'text/html'
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        link.click();
    }
}
