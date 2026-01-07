// german dictionary for COCO-SSD objects (80 total, adding most common ones)
const germanDictionary = {
    // people
    "person": {
        german: "Person",
        article: "die",
        pronunciation: "/pɛʁˈzoːn/",
        definition: "Ein Mensch, ein individuelles menschliches Wesen",
        example: "Eine Person steht vor der Tür."
    },

    // kitchen & dining
    "cup": {
        german: "Tasse",
        article: "die",
        pronunciation: "/ˈtasə/",
        definition: "Gefäß zum Trinken, meist mit Henkel",
        example: "Ich trinke Kaffee aus einer Tasse."
    },
    "bottle": {
        german: "Flasche",
        article: "die",
        pronunciation: "/ˈflaʃə/",
        definition: "Behälter für Flüssigkeiten",
        example: "Eine Flasche Wasser steht auf dem Tisch."
    },
    "bowl": {
        german: "Schüssel",
        article: "die",
        pronunciation: "/ˈʃʏsl̩/",
        definition: "Rundes Gefäß für Essen",
        example: "Die Suppe ist in der Schüssel."
    },
    "fork": {
        german: "Gabel",
        article: "die",
        pronunciation: "/ˈɡaːbl̩/",
        definition: "Besteck mit Zinken zum Essen",
        example: "Ich esse mit Messer und Gabel."
    },
    "knife": {
        german: "Messer",
        article: "das",
        pronunciation: "/ˈmɛsɐ/",
        definition: "Besteck zum Schneiden",
        example: "Das Messer ist scharf."
    },
    "spoon": {
        german: "Löffel",
        article: "der",
        pronunciation: "/ˈlœfl̩/",
        definition: "Besteck für Suppe und Flüssigkeiten",
        example: "Ich brauche einen Löffel für die Suppe."
    },

    // electronics
    "laptop": {
        german: "Laptop",
        article: "der",
        pronunciation: "/ˈlɛptɔp/",
        definition: "Tragbarer Computer",
        example: "Ich arbeite an meinem Laptop."
    },
    "cell phone": {
        german: "Handy",
        article: "das",
        pronunciation: "/ˈhɛndi/",
        definition: "Mobiles Telefon",
        example: "Mein Handy klingelt."
    },
    "keyboard": {
        german: "Tastatur",
        article: "die",
        pronunciation: "/tastaˈtuːɐ̯/",
        definition: "Eingabegerät für Computer",
        example: "Ich tippe auf der Tastatur."
    },
    "mouse": {
        german: "Maus",
        article: "die",
        pronunciation: "/maʊ̯s/",
        definition: "Computermaus zum Klicken",
        example: "Die Maus liegt neben der Tastatur."
    },
    "tv": {
        german: "Fernseher",
        article: "der",
        pronunciation: "/ˈfɛʁnˌzeːɐ/",
        definition: "Gerät zum Fernsehen",
        example: "Der Fernseher ist im Wohnzimmer."
    },

    // furniture
    "chair": {
        german: "Stuhl",
        article: "der",
        pronunciation: "/ʃtuːl/",
        definition: "Möbelstück zum Sitzen",
        example: "Ich sitze auf einem Stuhl."
    },
    "couch": {
        german: "Sofa",
        article: "das",
        pronunciation: "/ˈzoːfa/",
        definition: "Großes Sitzmöbel",
        example: "Das Sofa ist sehr bequem."
    },
    "bed": {
        german: "Bett",
        article: "das",
        pronunciation: "/bɛt/",
        definition: "Möbel zum Schlafen",
        example: "Ich gehe ins Bett."
    },
    "dining table": {
        german: "Esstisch",
        article: "der",
        pronunciation: "/ˈɛsˌtɪʃ/",
        definition: "Tisch zum Essen",
        example: "Wir sitzen am Esstisch."
    },

    // office & study
    "book": {
        german: "Buch",
        article: "das",
        pronunciation: "/buːx/",
        definition: "Gebundene Seiten mit gedrucktem Text",
        example: "Ich lese ein interessantes Buch."
    },
    "scissors": {
        german: "Schere",
        article: "die",
        pronunciation: "/ˈʃeːʁə/",
        definition: "Werkzeug zum Schneiden",
        example: "Die Schere liegt auf dem Tisch."
    },
    "clock": {
        german: "Uhr",
        article: "die",
        pronunciation: "/uːɐ̯/",
        definition: "Gerät zur Zeitanzeige",
        example: "Die Uhr zeigt drei Uhr."
    },
    "vase": {
        german: "Vase",
        article: "die",
        pronunciation: "/ˈvaːzə/",
        definition: "Gefäß für Blumen",
        example: "Die Blumen stehen in der Vase."
    },

    // clothing
    "backpack": {
        german: "Rucksack",
        article: "der",
        pronunciation: "/ˈʁʊkˌzak/",
        definition: "Tasche für den Rücken",
        example: "Mein Rucksack ist schwer."
    },
    "handbag": {
        german: "Handtasche",
        article: "die",
        pronunciation: "/ˈhantˌtaʃə/",
        definition: "Kleine Tasche zum Tragen",
        example: "Ihre Handtasche ist schön."
    },
    "umbrella": {
        german: "Regenschirm",
        article: "der",
        pronunciation: "/ˈʁeːɡn̩ˌʃɪʁm/",
        definition: "Schutz vor Regen",
        example: "Ich brauche einen Regenschirm."
    },

    // animals (common)
    "dog": {
        german: "Hund",
        article: "der",
        pronunciation: "/hʊnt/",
        definition: "Haustier, bester Freund des Menschen",
        example: "Der Hund bellt."
    },
    "cat": {
        german: "Katze",
        article: "die",
        pronunciation: "/ˈkat͡sə/",
        definition: "Kleines Haustier",
        example: "Die Katze schläft."
    },
    "bird": {
        german: "Vogel",
        article: "der",
        pronunciation: "/ˈfoːɡl̩/",
        definition: "Tier mit Flügeln",
        example: "Der Vogel fliegt."
    },

    // vehicles
    "car": {
        german: "Auto",
        article: "das",
        pronunciation: "/ˈaʊ̯to/",
        definition: "Fahrzeug mit Motor",
        example: "Das Auto fährt schnell."
    },
    "bicycle": {
        german: "Fahrrad",
        article: "das",
        pronunciation: "/ˈfaːɐ̯ˌʁaːt/",
        definition: "Zweirädriges Fahrzeug",
        example: "Ich fahre mit dem Fahrrad."
    },
    "motorcycle": {
        german: "Motorrad",
        article: "das",
        pronunciation: "/ˈmoːtoːˌʁaːt/",
        definition: "Zweirädriges Fahrzeug mit Motor",
        example: "Das Motorrad ist laut."
    },

    // food
    "apple": {
        german: "Apfel",
        article: "der",
        pronunciation: "/ˈapfl̩/",
        definition: "Runde Frucht",
        example: "Der Apfel ist rot."
    },
    "banana": {
        german: "Banane",
        article: "die",
        pronunciation: "/baˈnaːnə/",
        definition: "Gelbe längliche Frucht",
        example: "Die Banane ist reif."
    },
    "orange": {
        german: "Orange",
        article: "die",
        pronunciation: "/oˈʁãːʒə/",
        definition: "Runde orange Frucht",
        example: "Die Orange schmeckt süß."
    },
    "cake": {
        german: "Kuchen",
        article: "der",
        pronunciation: "/ˈkuːxn̩/",
        definition: "Süße Backware",
        example: "Der Kuchen schmeckt lecker."
    }

    // TODO: add remaining COCO-SSD objects (currently 32/80)
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