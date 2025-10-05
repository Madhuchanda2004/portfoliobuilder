document.getElementById('portfolioForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const bio = document.getElementById('bio').value;
  const skills = document.getElementById('skills').value.split(',');
  const linkedin = document.getElementById('linkedin').value;
  const github = document.getElementById('github').value;
  const imageFile = document.getElementById('image').files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const imageURL = reader.result;

    const portfolioHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>${name}'s Portfolio</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            text-align: center;
            padding: 30px;
          }
          .profile-img {
            border-radius: 50%;
            width: 150px;
            height: 150px;
            object-fit: cover;
          }
          .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .skills {
            margin-top: 20px;
          }
          .skills span {
            background: #007bff;
            color: white;
            padding: 5px 10px;
            margin: 5px;
            display: inline-block;
            border-radius: 4px;
          }
          a {
            display: inline-block;
            margin: 10px;
            text-decoration: none;
            color: #007bff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="${imageURL}" class="profile-img" alt="Profile Image"/>
          <h1>${name}</h1>
          <h3>${title}</h3>
          <p>${bio}</p>
          <div class="skills">
            <h4>Skills</h4>
            ${skills.map(skill => `<span>${skill.trim()}</span>`).join('')}
          </div>
          <div class="links">
            ${linkedin ? `<a href="${linkedin}" target="_blank">LinkedIn</a>` : ''}
            ${github ? `<a href="${github}" target="_blank">GitHub</a>` : ''}
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a downloadable HTML file
    const blob = new Blob([portfolioHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const outputDiv = document.getElementById('output');
    outputDiv.style.display = 'block';
    outputDiv.innerHTML = `
      <h2>Your Portfolio is Ready!</h2>
      <a href="${url}" download="my-portfolio.html" target="_blank">
        👉 Click here to download your portfolio
      </a>
    `;
  };

  reader.readAsDataURL(imageFile);
});
