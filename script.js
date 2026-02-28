document.getElementById('starter-btn').addEventListener('click', function() {
  alert('Purchase Starter Plan'); // Replace with your actual purchase logic
});

document.getElementById('pro-btn').addEventListener('click', function() {
  alert('Purchase Pro Plan'); // Replace with your actual purchase logic
});

document.getElementById('download-btn').addEventListener('click', function() {
  alert('Download Selenite 3.0'); // Replace with your actual download logic
});

document.getElementById('support-btn').addEventListener('click', function() {
    if (confirm("Are you sure you want to open an external link?")) {
        window.location.href = "https://discord.gg/y5m6EWUyQA";
    }
});
