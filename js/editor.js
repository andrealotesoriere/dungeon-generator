// js/editor.js

// Dati fittizi (Mock Data) per le creature
const mockCreatures = [
    { nome: "Goblin", cr: "1/4", ac: 15, pf: "7 (2d6)" },
    { nome: "Ogre", cr: "2", ac: 13, pf: "59 (7d10 + 21)" },
    { nome: "Scheletro", cr: "1/4", ac: 13, pf: "13 (2d8 + 4)" }
];

// Struttura dati fittizia del Dungeon che stiamo modificando
let currentDungeon = {
    nome: "Nuovo Dungeon Senza Nome",
    stanze: [
        { id: "A1", descrizione: "Ingresso", incontri: [] },
        { id: "B2", descrizione: "Corridoio", incontri: [] }
    ]
};

function initEditor() {
    // 1. Aggiorna il nome del dungeon
    document.getElementById('dungeonName').textContent = `Modifica: ${currentDungeon.nome}`;
    
    // 2. Popola la lista delle stanze nel <select>
    const roomSelector = document.getElementById('currentRoom');
    roomSelector.innerHTML = currentDungeon.stanze.map(stanza => 
        `<option value="${stanza.id}">Stanza ${stanza.id}: ${stanza.descrizione}</option>`
    ).join('');

    // 3. Aggiungi listener per la selezione della stanza
    roomSelector.addEventListener('change', loadRoomEncounters);

    // Carica gli incontri per la prima stanza all'avvio
    loadRoomEncounters(); 
}

function loadRoomEncounters() {
    const selectedRoomId = document.getElementById('currentRoom').value;
    const room = currentDungeon.stanze.find(s => s.id === selectedRoomId);
    
    const creatureListDiv = document.getElementById('creatureList');
    
    // Filtriamo e visualizziamo solo le creature (per ora)
    const creaturesInRoom = room.incontri.filter(e => e.type === 'creature');

    if (creaturesInRoom.length === 0) {
        creatureListDiv.innerHTML = `<h3>Creature in ${selectedRoomId}:</h3><p>Nessuna creatura aggiunta.</p><button onclick="addEncounter('creature')">+ Aggiungi Creatura</button>`;
    } else {
        // Qui dovremmo creare l'HTML per mostrare i dettagli delle creature
        // ... (Logica per renderizzare i dati)
    }
}

function addEncounter(type) {
    if (type === 'creature') {
        // Pop-up o Modale per selezionare una creatura da mockCreatures
        const selectedCreature = mockCreatures[0]; // Selezioniamo il Goblin per semplicità
        
        const selectedRoomId = document.getElementById('currentRoom').value;
        const room = currentDungeon.stanze.find(s => s.id === selectedRoomId);
        
        room.incontri.push({
            type: 'creature',
            quantita: 1,
            data: selectedCreature
        });

        alert(`Aggiunto 1 ${selectedCreature.nome} alla stanza ${selectedRoomId}`);
        loadRoomEncounters(); // Ricarica la lista per mostrare la nuova aggiunta
    }
}

// Avvia l'editor appena la pagina è caricata
document.addEventListener('DOMContentLoaded', initEditor);
