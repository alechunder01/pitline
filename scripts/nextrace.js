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
    const recordDriver = race?.circuit?.fastestLapDriverId;

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
    document.getElementById('race-info').textContent = `Závod se pojede ${formattedDateTime}.`;
    document.getElementById('circuit-info').textContent = `Pojede se ${circuitLaps} kol na ${circuitLengthKm} dlouhém okruhu ${circuitName}.`;
    document.getElementById('record').textContent = `Rekordní čás je ${recordTime} a zajel ho ${recordDriver}.`;
  })
  .catch(error => {
    console.error('Chyba při načítání:', error);
    document.getElementById('race-name').textContent = 'Chyba při načítání názvu závodu.';
    document.getElementById('race-info').textContent = 'Chyba při načítání data závodu.';
  });
