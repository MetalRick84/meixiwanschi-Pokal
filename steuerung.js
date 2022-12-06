/**
 * Crafty Component, der Steuerung eines Elements durch verschiedene Methoden (Neigung, Maus, etc) ermöglicht
 */
Crafty.c('Steuerung', {
    init: function() {console.log('Component Steuerung hinzugefügt')},
    steuerungDurchNeigung: steuerungDurchNeigung,
})

/**
 * Mach Element über Neigung steuerbar
 * @param {Object} mapAttribut -> mapping von Neigungswinkeln auf Objekteigenschaften
 * @param {Object} mapDaempfung -> mapping für Abschwächung der Auswirkung der Neigung auf die jeweiligen Projekteigenschaften
 */
function steuerungDurchNeigung(mapAttribut, mapDaempfung) {
    console.log('steuerungDurchNeigung hinzugefügt zu:', this);
    hinweiseMapAttribut(mapAttribut);
    window.addEventListener('deviceorientation', evt => {
        if (mapAttribut.alpha) {
            console.log('alpha:', evt.alpha, '; this.rotation:', this.rotation);
            this[mapAttribut.alpha] = 
                mapDaempfung && mapDaempfung.alpha ?
                evt.alpha * mapDaempfung.alpha:
                evt.alpha;
        }
        if (mapAttribut.beta) {
            this[mapAttribut.beta] = 
                mapDaempfung && mapDaempfung.beta ?
                evt.beta * mapDaempfung.beta:
                evt.beta;
        }
        if (mapAttribut.gamma) {
            this[mapAttribut.gamma] = 
                mapDaempfung && mapDaempfung.gamma ?
                evt.gamma * mapDaempfung.gamma:
                evt.gamma;
        }
    })
    return this
}

/**
 * Warhinweise 
 * @param {*} mapAttribut 
 */
function hinweiseMapAttribut(mapAttribut) {
    const valuesMapAttribut = Object.values(mapAttribut);
    if (valuesMapAttribut.includes('rotation')){
        console.log('rotation wird gesteuert --> origin() nicht vergessen')
    }
    if (
        valuesMapAttribut.includes('vx') ||
        valuesMapAttribut.includes('vy') ||
        valuesMapAttribut.includes('vy')
    ){
        console.log('v wird gesteuert --> Motion-Component nicht vergessen')
    }
}