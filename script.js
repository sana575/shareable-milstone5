var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    // Get form elements
    var usernameElement = document.getElementById('username');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var imageInput = document.getElementById('imageInput');
    // Validate if all required fields are present
    if (usernameElement &&
        nameElement &&
        emailElement &&
        phoneElement &&
        educationElement &&
        experienceElement &&
        skillsElement &&
        imageInput) {
        var username = usernameElement.value;
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        // Handle profile image upload
        var imageFile = imageInput.files ? imageInput.files[0] : null; // Get the selected image file
        var reader_1 = new FileReader();
        // Once the image is loaded, update the profile image element
        reader_1.onloadend = function () {
            var profileImageElement = document.getElementById('profileImage');
            if (profileImageElement) {
                profileImageElement.src = reader_1.result; // Set the image source to the uploaded image
            }
        };
        // If an image file is selected, read it as a Data URL (base64 encoded)
        if (imageFile) {
            reader_1.readAsDataURL(imageFile);
        }
        // Create the resume output HTML with a shareable link and download button
        var resumeOutput = "\n            <h2>Resume</h2>\n            <img id=\"profileImage\" src=\"".concat(imageFile ? reader_1.result : '', "\" alt=\"Profile Image\" />\n            <p><strong>Username:</strong> <span class=\"editable\" contenteditable=\"true\">").concat(username, "</span></p>\n            <p><strong>Name:</strong> <span class=\"editable\" contenteditable=\"true\">").concat(name_1, "</span></p>\n            <p><strong>Email:</strong> <span class=\"editable\" contenteditable=\"true\">").concat(email, "</span></p>\n            <p><strong>Phone:</strong> <span class=\"editable\" contenteditable=\"true\">").concat(phone, "</span></p>\n            <h3>Education</h3>\n            <p><span class=\"editable\" contenteditable=\"true\">").concat(education, "</span></p>\n            <h3>Experience</h3>\n            <p><span class=\"editable\" contenteditable=\"true\">").concat(experience, "</span></p>\n            <h3>Skills</h3>\n            <p><span class=\"editable\" contenteditable=\"true\">").concat(skills, "</span></p>\n            \n            <h3>Shareable Resume Link:</h3>\n            <p><a href=\"https://www.example.com/").concat(username, "\" target=\"_blank\">Click here to view your resume</a></p>\n\n            <!-- Download Button -->\n            <button id=\"downloadBtn\" onclick=\"downloadResume()\">Download Resume</button>\n        ");
        // Get the resume output element and set its inner HTML
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
});
// Function to download the resume
function downloadResume() {
    var _a;
    var resumeContent = (_a = document.getElementById('resumeOutput')) === null || _a === void 0 ? void 0 : _a.innerHTML;
    if (resumeContent) {
        var blob = new Blob([resumeContent], { type: 'text/html' }); // Type updated to 'text/html'
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'resume.html';
        link.click();
    }
}
