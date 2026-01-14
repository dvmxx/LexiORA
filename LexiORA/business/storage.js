const germanDictionary = {
    "person": {german: "Person", article: "die", pronunciation: "/pɛʁˈzoːn/", definition: "Ein Mensch, ein individuelles menschliches Wesen", example: "Eine Person steht vor der Tür."},
    "bicycle": { german: "Fahrrad", article: "das", pronunciation: "/ˈfaːɐ̯ʁaːt/", definition: "Zweirädriges Fahrzeug", example: "Ich fahre mit dem Fahrrad." },
    "car": { german: "Auto", article: "das", pronunciation: "/ˈaʊ̯to/", definition: "Kraftwagen zur Personenbeförderung", example: "Das Auto ist rot." },
    "motorcycle": { german: "Motorrad", article: "das", pronunciation: "/ˈmoːtoːɐ̯ʁaːt/", definition: "Zweirädriges Kraftfahrzeug", example: "Das Motorrad ist sehr schnell." },
    "airplane": { german: "Flugzeug", article: "das", pronunciation: "/ˈfluːktsɔʏ̯k/", definition: "Luftfahrzeug", example: "Das Flugzeug fliegt hoch." },
    "bus": { german: "Bus", article: "der", pronunciation: "/bʊs/", definition: "Großes Fahrzeug für viele Personen", example: "Der Bus kommt pünktlich." },
    "train": { german: "Zug", article: "der", pronunciation: "/tsuːk/", definition: "Schienenfahrzeug", example: "Der Zug fährt in den Bahnhof ein." },
    "truck": { german: "LKW", article: "der", pronunciation: "/ɛlkaːˈveː/", definition: "Lastkraftwagen für Güter", example: "Der LKW transportiert Waren." },
    "boat": { german: "Boot", article: "das", pronunciation: "/boːt/", definition: "Kleines Wasserfahrzeug", example: "Das Boot schwimmt auf dem See." },
    "traffic light": { german: "Ampel", article: "die", pronunciation: "/ˈampl̩/", definition: "Lichtsignalanlage", example: "Die Ampel steht auf Rot." },
    "fire hydrant": { german: "Hydrant", article: "der", pronunciation: "/hyˈdʁant/", definition: "Anschluss für die Feuerwehr", example: "Der Hydrant ist gelb." },
    "stop sign": { german: "Stoppschild", article: "das", pronunciation: "/ˈstɔpˌʃɪlt/", definition: "Verkehrsschild zum Anhalten", example: "Am Stoppschild muss man halten." },
    "parking meter": { german: "Parkuhr", article: "die", pronunciation: "/ˈpaʁkˌʔuːɐ̯/", definition: "Gerät zur Parkzeitmessung", example: "Ich werfe Geld in die Parkuhr." },
    "bench": { german: "Bank", article: "die", pronunciation: "/baŋk/", definition: "Sitzmöbel für mehrere Personen", example: "Wir sitzen auf einer Bank." },
    "bird": { german: "Vogel", article: "der", pronunciation: "/ˈfoːɡl̩/", definition: "Tier mit Federn und Flügeln", example: "Der Vogel singt im Baum." },
    "cat": { german: "Katze", article: "die", pronunciation: "/ˈkat͡sə/", definition: "Beliebtes Haustier", example: "Die Katze schläft." },
    "dog": { german: "Hund", article: "der", pronunciation: "/hʊnt/", definition: "Der beste Freund des Menschen", example: "Der Hund bellt laut." },
    "horse": { german: "Pferd", article: "das", pronunciation: "/p͡feːɐ̯t/", definition: "Großes Huftier zum Reiten", example: "Das Pferd läuft über die Wiese." },
    "sheep": { german: "Schaf", article: "das", pronunciation: "/ʃaːf/", definition: "Wolliges Nutztier", example: "Das Schaf frisst Gras." },
    "cow": { german: "Kuh", article: "die", pronunciation: "/kuː/", definition: "Nutztier, das Milch gibt", example: "Die Kuh steht im Stall." },
    "elephant": { german: "Elefant", article: "der", pronunciation: "/eleˈfant/", definition: "Größtes Landsäugetier", example: "Der Elefant hat einen Rüssel." },
    "bear": { german: "Bär", article: "der", pronunciation: "/bɛːɐ̯/", definition: "Großes Raubtier", example: "Der Bär sucht nach Honig." },
    "zebra": { german: "Zebra", article: "das", pronunciation: "/ˈt͡seːbʁa/", definition: "Gestreiftes Wildpferd", example: "Das Zebra hat schwarz-weiße Streifen." },
    "giraffe": { german: "Giraffe", article: "die", pronunciation: "/ɡiˈʁafə/", definition: "Tier mit sehr langem Hals", example: "Die Giraffe frisst Blätter." },
    "backpack": { german: "Rucksack", article: "der", pronunciation: "/ˈʁʊkˌzak/", definition: "Tasche für den Rücken", example: "Mein Rucksack ist schwer." },
    "umbrella": { german: "Regenschirm", article: "der", pronunciation: "/ˈʁeːɡn̩ˌʃɪʁm/", definition: "Schutz gegen Regen", example: "Ich öffne meinen Regenschirm." },
    "handbag": { german: "Handtasche", article: "die", pronunciation: "/ˈhantˌtaʃə/", definition: "Kleine Tasche für den Alltag", example: "Sie trägt eine elegante Handtasche." },
    "tie": { german: "Krawatte", article: "die", pronunciation: "/kʁaˈvatə/", definition: "Halsschmuck für Hemden", example: "Er bindet sich eine Krawatte um." },
    "suitcase": { german: "Koffer", article: "der", pronunciation: "/ˈkɔfɐ/", definition: "Gepäckstück für Reisen", example: "Ich packe meinen Koffer." },
    "frisbee": { german: "Frisbee", article: "die", pronunciation: "/ˈfʁɪsbi/", definition: "Wurfscheibe aus Plastik", example: "Wir werfen die Frisbee im Park." },
    "skis": { german: "Ski", article: "die", pronunciation: "/ʃiː/", definition: "Bretter zum Schneeschuhlaufen", example: "Die Skier stehen im Keller." },
    "snowboard": { german: "Snowboard", article: "das", pronunciation: "/ˈsnoːbɔːɐ̯t/", definition: "Brett zum Gleiten im Schnee", example: "Er fährt mit dem Snowboard." },
    "sports ball": { german: "Ball", article: "der", pronunciation: "/bal/", definition: "Runder Gegenstand zum Spielen", example: "Der Ball fliegt ins Tor." },
    "kite": { german: "Drachen", article: "der", pronunciation: "/ˈdʁaxn̩/", definition: "Spielzeug für den Wind", example: "Der Drachen steigt hoch am Himmel." },
    "baseball bat": { german: "Basebalschläger", article: "der", pronunciation: "/ˈbeɪsbɔːlˌʃlɛːɡɐ/", definition: "Schläger für Baseball", example: "Er hält den Baseballschläger fest." },
    "baseball glove": { german: "Baseballhandschuh", article: "der", pronunciation: "/ˈbeɪsbɔːlˌhantʃuː/", definition: "Fanghandschuh für Baseball", example: "Der Handschuh ist aus Leder." },
    "skateboard": { german: "Skateboard", article: "das", pronunciation: "/ˈskeɪtbɔːɐ̯t/", definition: "Rollbrett", example: "Das Skateboard hat vier Rollen." },
    "surfboard": { german: "Surfbrett", article: "das", pronunciation: "/ˈsœːɐ̯fˌbʁɛt/", definition: "Brett zum Wellenreiten", example: "Das Surfbrett liegt am Strand." },
    "tennis racket": { german: "Tennisschläger", article: "der", pronunciation: "/ˈtɛnɪsˌʃlɛːɡɐ/", definition: "Schläger für Tennis", example: "Mein Tennisschläger braucht neue Saiten." },
    "bottle": { german: "Flasche", article: "die", pronunciation: "/ˈflaʃə/", definition: "Behälter für Getränke", example: "Die Flasche ist aus Glas." },
    "wine glass": { german: "Weinglas", article: "das", pronunciation: "/ˈvaɪ̯nˌɡlaːs/", definition: "Trinkgefäß für Wein", example: "Das Weinglas steht auf dem Tisch." },
    "cup": {german: "Tasse", article: "die", pronunciation: "/ˈtasə/", definition: "Gefäß zum Trinken, meist mit Henkel", example: "Ich trinke Kaffee aus einer Tasse."},
    "fork": { german: "Gabel", article: "die", pronunciation: "/ˈɡaːbl̩/", definition: "Essbesteck mit Zacken", example: "Ich esse den Salat mit einer Gabel." },
    "knife": { german: "Messer", article: "das", pronunciation: "/ˈmɛsɐ/", definition: "Werkzeug zum Schneiden", example: "Das Messer ist sehr scharf." },
    "spoon": { german: "Löffel", article: "der", pronunciation: "/ˈlœfl̩/", definition: "Essbesteck für Suppe", example: "Ich esse die Suppe mit einem Löffel." },
    "bowl": { german: "Schüssel", article: "die", pronunciation: "/ˈʃʏsl̩/", definition: "Tiefes Gefäß für Speisen", example: "Die Schüssel ist voller Müsli." },
    "banana": { german: "Banane", article: "die", pronunciation: "/baˈnaːnə/", definition: "Gelbe Südfrucht", example: "Die Banane schmeckt süß." },
    "apple": { german: "Apfel", article: "der", pronunciation: "/ˈapfl̩/", definition: "Rundliche Kernfrucht", example: "Ich esse jeden Tag einen Apfel." },
    "sandwich": { german: "Sandwich", article: "das", pronunciation: "/ˈsɛntvɪt͡ʃ/", definition: "Belegtes Brot", example: "Das Sandwich ist mit Käse belegt." },
    "orange": { german: "Orange", article: "die", pronunciation: "/oˈʁãːʒə/", definition: "Zitrusfrucht", example: "Die Orange enthält viel Vitamin C." },
    "broccoli": { german: "Brokkoli", article: "der", pronunciation: "/ˈbʁɔkoli/", definition: "Grünes Gemüse", example: "Brokkoli ist sehr gesund." },
    "carrot": { german: "Karotte", article: "die", pronunciation: "/kaˈʁɔtə/", definition: "Längliche Rübe", example: "Hasen fressen gerne Karotten." },
    "hot dog": { german: "Hotdog", article: "der", pronunciation: "/ˈhɔtdɔk/", definition: "Würstchen im Brötchen", example: "Ich bestelle einen Hotdog mit Senf." },
    "pizza": { german: "Pizza", article: "die", pronunciation: "/ˈpɪt͡sa/", definition: "Italienisches Flachgebäck", example: "Die Pizza kommt frisch aus dem Ofen." },
    "donut": { german: "Donut", article: "der", pronunciation: "/ˈdoːnat/", definition: "Frittierter Teigring", example: "Der Donut hat eine Zuckerglasur." },
    "cake": { german: "Kuchen", article: "der", pronunciation: "/ˈkuːxn̩/", definition: "Süßes Backwerk", example: "Zum Geburtstag gibt es Kuchen." },
    "chair": { german: "Stuhl", article: "der", pronunciation: "/ʃtuːl/", definition: "Sitzmöbel für eine Person", example: "Setz dich auf den Stuhl." },
    "couch": { german: "Sofa", article: "das", pronunciation: "/ˈzoːfa/", definition: "Bequemes Sitzmöbel", example: "Wir schauen auf dem Sofa fern." },
    "potted plant": { german: "Topfpflanze", article: "die", pronunciation: "/ˈtɔp͡fˌp͡flant͡sə/", definition: "Pflanze in einem Topf", example: "Die Topfpflanze braucht Wasser." },
    "bed": { german: "Bett", article: "das", pronunciation: "/bɛt/", definition: "Möbel zum Schlafen", example: "Das Bett ist sehr gemütlich." },
    "dining table": { german: "Esstisch", article: "der", pronunciation: "/ˈɛsˌtɪʃ/", definition: "Tisch zum Essen", example: "Wir sitzen alle am Esstisch." },
    "toilet": { german: "Toilette", article: "die", pronunciation: "/toˈlɛtə/", definition: "Sanitäre Anlage", example: "Wo ist die Toilette?" },
    "tv": { german: "Fernseher", article: "der", pronunciation: "/ˈfɛʁnˌzeːɐ/", definition: "Gerät zum Fernsehen", example: "Der Fernseher ist ausgeschaltet." },
    "laptop": {german: "Laptop", article: "der", pronunciation: "/ˈlɛptɔp/", definition: "Tragbarer Computer", example: "Ich arbeite an meinem Laptop."},
    "mouse": { german: "Maus", article: "die", pronunciation: "/maʊ̯s/", definition: "Eingabegerät für Computer", example: "Ich klicke mit der Maus." },
    "remote": { german: "Fernbedienung", article: "die", pronunciation: "/ˈfɛʁnbeˌdiːnʊŋ/", definition: "Gerät zum Fernsteuern", example: "Gib mir bitte die Fernbedienung." },
    "keyboard": { german: "Tastatur", article: "die", pronunciation: "/tastaˈtuːɐ̯/", definition: "Gerät zum Tippen", example: "Die Tastatur hat viele Tasten." },
    "cell phone": { german: "Handy", article: "das", pronunciation: "/ˈhɛndi/", definition: "Mobiltelefon", example: "Ich schreibe eine Nachricht auf dem Handy." },
    "microwave": { german: "Mikrowelle", article: "die", pronunciation: "/ˈmɪkʁoˌvɛlə/", definition: "Gerät zum Erwärmen von Speisen", example: "Ich mache das Essen in der Mikrowelle warm." },
    "oven": { german: "Ofen", article: "der", pronunciation: "/ˈoːfn̩/", definition: "Gerät zum Backen", example: "Der Kuchen ist im Ofen." },
    "toaster": { german: "Toaster", article: "der", pronunciation: "/ˈtoːstɐ/", definition: "Gerät zum Rösten von Brot", example: "Das Brot springt aus dem Toaster." },
    "sink": { german: "Waschbecken", article: "das", pronunciation: "/ˈvaʃˌbɛkn̩/", definition: "Becken zum Waschen", example: "Ich wasche meine Hände im Waschbecken." },
    "refrigerator": { german: "Kühlschrank", article: "der", pronunciation: "/ˈkyːlˌʃʁaŋk/", definition: "Gerät zum Kühlen von Lebensmitteln", example: "Die Milch steht im Kühlschrank." },
    "book": {german: "Buch", article: "das", pronunciation: "/buːx/", definition: "Gebundene Seiten mit gedrucktem Text", example: "Ich lese ein interessantes Buch."},
    "clock": { german: "Uhr", article: "die", pronunciation: "/uːɐ̯/", definition: "Gerät zur Zeitmessung", example: "Die Uhr zeigt zwei Uhr." },
    "vase": { german: "Vase", article: "die", pronunciation: "/ˈvaːzə/", definition: "Gefäß für Blumen", example: "Die Blumen stehen in der Vase." },
    "scissors": { german: "Schere", article: "die", pronunciation: "/ˈʃeːʁə/", definition: "Werkzeug zum Schneiden", example: "Ich schneide das Papier mit der Schere." },
    "teddy bear": { german: "Teddybär", article: "der", pronunciation: "/ˈtɛdiˌbɛːɐ̯/", definition: "Stofftier", example: "Das Kind spielt mit dem Teddybären." },
    "hair drier": { german: "Föhn", article: "der", pronunciation: "/føːn/", definition: "Gerät zum Trocknen der Haare", example: "Ich trockne meine Haare mit dem Föhn." },
    "toothbrush": { german: "Zahnbürste", article: "die", pronunciation: "/ˈt͡saːnˌbʏʁstə/", definition: "Bürste zur Zahnpflege", example: "Ich putze mir die Zähne mit der Zahnbürste." }

};

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('germanWord')) {
        loadResult();
    }

    if (document.getElementById('collectionGrid')) {
        loadCollection();
    }

    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveToCollection);
    }

    const scanAnotherBtn = document.getElementById('scanAnotherBtn');
    if (scanAnotherBtn) {
        scanAnotherBtn.addEventListener('click', function() {
            window.location.href = 'camera-screen.html';
        });
    }

    const backToCollectionBtn = document.getElementById('backToCollectionBtn');
    if (backToCollectionBtn) {
        backToCollectionBtn.addEventListener('click', function() {
            sessionStorage.removeItem('viewMode');
            window.location.href = 'collection-screen.html';
        });
    }

    const startScanningBtn = document.getElementById('startScanningBtn');
    if (startScanningBtn) {
        startScanningBtn.addEventListener('click', function() {
            window.location.href = 'camera-screen.html';
        });
    }

    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', filterCollection);
    }
});

function loadResult() {
    const imageData = sessionStorage.getItem('capturedImage');
    const detectedObject = sessionStorage.getItem('detectedObject') || 'cup';
    const viewMode = sessionStorage.getItem('viewMode');

    const saveBtn = document.getElementById('saveBtn');
    const scanAnotherBtn = document.getElementById('scanAnotherBtn');
    const backToCollectionBtn = document.getElementById('backToCollectionBtn');

    if (imageData) {
        document.getElementById('capturedImage').src = imageData;
    }

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
        document.getElementById('germanWord').textContent =
            'Unknown object';
        document.getElementById('pronunciation').textContent = '';
        document.getElementById('definition').textContent =
            'This object is not in our lexicon.';
        document.getElementById('example').textContent = '';
    }

    if (viewMode === 'collection') {
        if (saveBtn) saveBtn.classList.add('hidden');
        if (scanAnotherBtn) scanAnotherBtn.classList.add('hidden');
        if (backToCollectionBtn) backToCollectionBtn.classList.remove('hidden');
    } else {
        if (saveBtn) saveBtn.classList.remove('hidden');
        if (scanAnotherBtn) scanAnotherBtn.classList.remove('hidden');
        if (backToCollectionBtn) backToCollectionBtn.classList.add('hidden');
    }
}

function saveToCollection() {
    const imageData = sessionStorage.getItem('capturedImage');
    const detectedObject = sessionStorage.getItem('detectedObject') || 'cup';
    const translation = germanDictionary[detectedObject];

    if (!translation) {
        alert('Cannot save unknown object.');
        return;
    }

    let collection = JSON.parse(localStorage.getItem('lexiCollection')) || [];

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

    collection.push(entry);

    localStorage.setItem('lexiCollection', JSON.stringify(collection));

    showSuccess('Added to My Index Cards');

    setTimeout(() => {
        window.location.href = 'collection-screen.html';
    }, 1500);
}

function loadCollection() {
    const collection = JSON.parse(localStorage.getItem('lexiCollection')) || [];
    const grid = document.getElementById('collectionGrid');
    const emptyState = document.getElementById('emptyState');

    if (collection.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    grid.classList.remove('hidden');

    grid.innerHTML = '';

    collection.reverse().forEach(item => {
        const card = createCollectionCard(item);
        grid.appendChild(card);
    });
}

function createCollectionCard(item) {
    const card = document.createElement('div');
    card.className = 'collection-card';
    card.dataset.id = item.id;

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

    card.addEventListener('click', function() {
        viewCardDetails(item.id);
    });

    return card;
}

function viewCardDetails(cardId) {
    const collection = JSON.parse(localStorage.getItem('lexiCollection')) || [];
    const item = collection.find(card => card.id === cardId);

    if (!item) return;

    sessionStorage.setItem('capturedImage', item.image);
    sessionStorage.setItem('detectedObject', item.objectKey);
    sessionStorage.setItem('viewMode', 'collection');

    window.location.href = 'result-screen.html';
}

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