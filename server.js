const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve all your static files (index.html, games.html, search.html, etc.)
app.use(express.static(__dirname));

// Handle the /search route submitted by search.html
app.get('/search', (req, res) => {
    const searchQuery = req.query.q;
    // Right now, this just redirects back to home. 
    // You can update this later to filter games programmatically!
    console.log(`User searched for: ${searchQuery}`);
    res.redirect(`/?search=${encodeURIComponent(searchQuery)}`);
});

// Fallback to send index.html for the home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running smoothly at http://localhost:${PORT}`);
});