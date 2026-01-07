// temporary german dictionary (will expand with COCO-SSD integration)
const germanDictionary = {
    "person": {
        german: "Person",
        article: "die",
        pronunciation: "/pɛʁˈzoːn/",
        definition: "Ein Mensch, ein individuelles menschliches Wesen",
        example: "Eine Person steht vor der Tür."
    },
    "cup": {
        german: "Tasse",
        article: "die",
        pronunciation: "/ˈtasə/",
        definition: "Gefäß zum Trinken, meist mit Henkel",
        example: "Ich trinke Kaffee aus einer Tasse."
    },
    "book": {
        german: "Buch",
        article: "das",
        pronunciation: "/buːx/",
        definition: "Gebundene Seiten mit gedrucktem Text",
        example: "Ich lese ein interessantes Buch."
    },
    "laptop": {
        german: "Laptop",
        article: "der",
        pronunciation: "/ˈlɛptɔp/",
        definition: "Tragbarer Computer",
        example: "Ich arbeite an meinem Laptop."
    }
    // TODO: add all 80 COCO-SSD objects
};

document.addEventListener('DOMContentLoaded', function() {
    // check if on result screen
    if (document.getElementById('germanWord')) {
        loadResult();
    }

    // check if on collection screen
    if (document.getElementById('collectionGrid')) {
        loadCollection();
    }

    // save button
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveToCollection);
    }

    // scan another button
    const scanAnotherBtn = document.getElementById('scanAnotherBtn');
    if (scanAnotherBtn) {
        scanAnotherBtn.addEventListener('click', function() {
            window.location.href = 'camera-screen.html';
        });
    }

    // start scanning button (empty state)
    const startScanningBtn = document.getElementById('startScanningBtn');
    if (startScanningBtn) {
        startScanningBtn.addEventListener('click', function() {
            window.location.href = 'camera-screen.html';
        });
    }

    // search functionality
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', filterCollection);
    }
});

// load and display result from sessionStorage
function loadResult() {
    // get data from camera capture (temporary - will come from COCO-SSD)
    const imageData = sessionStorage.getItem('capturedImage');
    const detectedObject = sessionStorage.getItem('detectedObject') || 'cup'; // default for testing
    const viewMode = sessionStorage.getItem('viewMode'); // check if viewing from collection

    // display captured image
    if (imageData) {
        document.getElementById('capturedImage').src = imageData;
    }

    // get german translation
    const translation = germanDictionary[detectedObject];

    if (translation) {
        document.getElementById('germanWord').textContent =
            `${translation.article} ${translation.german}`;
        document.getElementById('pronunciation').textContent =
            translation.pronunciation;
        document.getElementById('definition').textContent =
            translation.definition;
        document.getElementById('example').innerHTML =
            `<strong>Beispiel:</strong> ${translation.example}`;
    } else {
        // object not in dictionary
        document.getElementById('germanWord').textContent =
            'Unbekanntes Objekt';
        document.getElementById('pronunciation').textContent = '';
        document.getElementById('definition').textContent =
            'Dieses Objekt ist noch nicht in unserem Wörterbuch.';
        document.getElementById('example').textContent = '';
    }

    // if viewing from collection, hide save button and change "scan another" to "back"
    if (viewMode === 'collection') {
        const saveBtn = document.getElementById('saveBtn');
        const scanAnotherBtn = document.getElementById('scanAnotherBtn');

        if (saveBtn) saveBtn.style.display = 'none';
        if (scanAnotherBtn) {
            scanAnotherBtn.textContent = 'Back to Collection';
            scanAnotherBtn.onclick = function() {
                sessionStorage.removeItem('viewMode');
                window.location.href = 'collection-screen.html';
            };
        }
    }
}

// save to collection (localStorage)
function saveToCollection() {
    const imageData = sessionStorage.getItem('capturedImage');
    const detectedObject = sessionStorage.getItem('detectedObject') || 'cup';
    const translation = germanDictionary[detectedObject];

    if (!translation) {
        alert('Kann unbekanntes Objekt nicht speichern.');
        return;
    }

    // get existing collection from localStorage
    let collection = JSON.parse(localStorage.getItem('lexiCollection')) || [];

    // create new entry
    const entry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        image: imageData,
        objectKey: detectedObject,
        german: translation.german,
        article: translation.article,
        pronunciation: translation.pronunciation,
        definition: translation.definition,
        example: translation.example
    };

    // add to collection
    collection.push(entry);

    // save to localStorage
    localStorage.setItem('lexiCollection', JSON.stringify(collection));

    // show success message
    showSuccess('Added to My Index Cards');

    // redirect to collection after delay
    setTimeout(() => {
        window.location.href = 'collection-screen.html';
    }, 1500);
}

// load and display collection
function loadCollection() {
    const collection = JSON.parse(localStorage.getItem('lexiCollection')) || [];
    const grid = document.getElementById('collectionGrid');
    const emptyState = document.getElementById('emptyState');

    if (collection.length === 0) {
        // show empty state
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    // hide empty state
    emptyState.classList.add('hidden');
    grid.classList.remove('hidden');

    // clear grid
    grid.innerHTML = '';

    // display cards (newest first)
    collection.reverse().forEach(item => {
        const card = createCollectionCard(item);
        grid.appendChild(card);
    });
}

// create collection card element
function createCollectionCard(item) {
    const card = document.createElement('div');
    card.className = 'collection-card';
    card.dataset.id = item.id;

    // format date
    const date = new Date(item.timestamp);
    const formattedDate = date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    card.innerHTML = `
          <span class="card-heart">❤️</span>
          <img src="${item.image}" alt="${item.german}" class="card-image">
          <div class="card-title">${item.german}</div>
          <div class="card-date">${formattedDate}</div>
      `;

    // click to view details
    card.addEventListener('click', function() {
        viewCardDetails(item.id);
    });

    return card;
}

// view card details
function viewCardDetails(cardId) {
    const collection = JSON.parse(localStorage.getItem('lexiCollection')) || [];
    const item = collection.find(card => card.id === cardId);

    if (!item) return;

    // store in sessionStorage and navigate to result screen
    sessionStorage.setItem('capturedImage', item.image);
    sessionStorage.setItem('detectedObject', item.objectKey);
    sessionStorage.setItem('viewMode', 'collection'); // indicate we're viewing from collection

    window.location.href = 'result-screen.html';
}

// filter collection based on search
function filterCollection() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.querySelectorAll('.collection-card');

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();

        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}