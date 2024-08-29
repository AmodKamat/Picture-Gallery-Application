
const UNSPLASH_ACCESS_KEY = 'hVhgLFxU3DleapOFqvKq0yDXu8K8zlXVIJSIpfhwwvI';


const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const gallery = document.getElementById('gallery');


searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchPhotos(query);
    }
});


async function searchPhotos(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${'hVhgLFxU3DleapOFqvKq0yDXu8K8zlXVIJSIpfhwwvI'}&per_page=12`);
        const data = await response.json();
        displayPhotos(data.results);
    } catch (error) {
        console.error('Error fetching photos from Unsplash:', error);
    }
}


function displayPhotos(photos) {
    gallery.innerHTML = ''; // Clear previous results
    photos.forEach(photo => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = photo.urls.small;
        img.alt = photo.description || 'Unsplash Photo';
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        infoDiv.innerHTML = `
            <p><strong>Author:</strong> ${photo.user.name}</p>
            <p><strong>Description:</strong> ${photo.description || 'N/A'}</p>
            <a href="${photo.links.html}" target="_blank">View on Unsplash</a>
        `;
        
        photoDiv.appendChild(img);
        photoDiv.appendChild(infoDiv);
        gallery.appendChild(photoDiv);
    });
}
