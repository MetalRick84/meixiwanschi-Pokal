/**
 * Crafty Component, der Steuerung eines Elements durch verschiedene Methoden (Neigung, Maus, etc) ermöglicht
 */
Crafty.c('Steuerung', {
    steuerungDurchNeigung: steuerungDurchNeigung,
})

/**
 * Mach Element über Neigung steuerbar
 * @param {Object} mapAttribut -> mapping von Neigungswinkeln auf Objekteigenschaften
 * @param {Object} mapDaempfung -> mapping für Abschwächung der Auswirkung der Neigung auf die jeweiligen Projekteigenschaften
 */
function steuerungDurchNeigung(mapAttribut, mapDaempfung) {
    console.log('steuerungDurchNeigung hinzugefügt zu:', this);
    document.addEventListener('deviceorientation', evt => {
        if (mapAttribut.alpha) {
            this[mapAttribut.alpha] = evt.alpha * mapDaempfung.alpha;
        }
        if (mapAttribut.beta) {
            this[mapAttribut.beta] = evt.beta * mapDaempfung.beta;
        }
        if (mapAttribut.gamma) {
            this[mapAttribut.gamma] = evt.gamma * mapDaempfung.gamma
        }
    })
}