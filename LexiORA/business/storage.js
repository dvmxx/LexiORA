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
    },
    // TODO: add all 80 COCO-SSD objects
};

document.addEventListener('DOMContentLoaded', function() {
    // check if on result screen
    if (document.getElementById('germanWord')) {
        loadResult();
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
});

// load and display result from sessionStorage
function loadResult() {
    // get data from camera capture (temporary - will come from COCO-SSD)
    const imageData = sessionStorage.getItem('capturedImage');
    const detectedObject = sessionStorage.getItem('detectedObject') || 'cup'; // default for testing

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