fetch('https://f1api.dev/api/current/next')
  .then(response => response.json())
  .then(data => {
    const race = data.race?.[0];

    const raceName = race?.raceName || 'Závod nenalezen';
    const raceDateStr = race?.schedule?.race?.date;
    const raceTimeStr = race?.schedule?.race?.time;

    const circuitName = race?.circuit?.circuitName;
    const circuitLaps = race?.laps;
    const circuitLengthRaw = race?.circuit?.circuitLength;

    const recordTime = race?.circuit?.lapRecord;
    let recordDriver = race?.circuit?.fastestLapDriverId;

    // Úprava jména jezdce: pomlčka na mezeru, první písmena velká
    if (recordDriver) {
      recordDriver = recordDriver
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    // 🧮 Převod délky z metrů na km
    let circuitLengthKm = 'Neznámá délka';
    if (circuitLengthRaw) {
      const meters = parseFloat(circuitLengthRaw.replace('km', '').trim());
      const km = meters / 1000;
      circuitLengthKm = `${km.toLocaleString('cs-CZ', { minimumFractionDigits: 3 })} km`;
    }

    let formattedDateTime = 'Datum a čas nenalezen';

    if (raceDateStr && raceTimeStr) {
      const dateTime = new Date(`${raceDateStr}T${raceTimeStr}`);
      const options = {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Prague'
      };
      formattedDateTime = new Intl.DateTimeFormat('cs-CZ', options).format(dateTime);
    }

    document.getElementById('race-name').textContent = `${raceName}`;
    document.getElementById('race-info').textContent = `Čas: ${formattedDateTime}.`;
    document.getElementById('circuit-name').textContent = `Okruh: ${circuitName}`;
    document.getElementById('circuit-laps').textContent = `Počet kol: ${circuitLaps}`;
    document.getElementById('circuit-length').textContent = `Délka kola: ${circuitLengthKm}`;
    document.getElementById('record-driver').textContent = `Držitel rekordu: ${recordDriver}`;
    document.getElementById('record-time').textContent = `Nejrychlejší kolo: ${recordTime}`;
  })
