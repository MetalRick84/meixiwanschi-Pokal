// Steuerung eines Elements durch verschiedene Methoden (Neigung, Maus, etc) ermöglicht --> v.a. zur Verwendung in Crafty.js

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

/**
 * Überträgt values von objAttribute auf Entity,
 * und führt danach cbNachUpdate aus (objAttribute und Entity als Parameter) zB senden Attibute an Websocket, ink sharedId und event)
 * @param {*} objAttribute 
 * @param {*} cbNachUpdate 
 * @returns 
 */
function akualisiereAttribute(objAttribute, cbNachUpdate) {
   return this;
   // wenn websocket-Component registriert:
   // Anm: sharedId wird von Websocket im BE vergeben, zB beim Registrieren von neuen Spielern, weil Crafty.js-Component-Ids auf verteilten Clients nicht zuverlässig übereintimmen können
   // if (this.websocketRegistriert) {
        // objAttribute.sharedId = this.shareId;
        // objAttribute.evt = Websocket.EVENTS.aktualisiertAttribute;
    // }
}

/**
 * Wandelt mapAttribute in objAttribute um.
 * keys für obj Attribute: values von mapAttribute.
 * values für obj Attribute: entsprechende Attributwerte von Entity
 * 
 * @param {*} mapAttribute 
 * @returns 
 */
function umwandleMapAttribute(mapAttribute) {
    return objAttribute
}

/**
 * Objekt zur Zusammenfassung der Funktionen.
 * Ist so strukturiert, dass es direkt als Crafty-Component verwendet werden kann.
 */
const Steuerung = {
    init: function() {console.log('Component Steuerung hinzugefügt')},
    steuerungDurchNeigung,
    akualisiereAttribute,
}

/**
 * Crafty Component, der Steuerung eines Elements durch verschiedene Methoden (Neigung, Maus, etc) ermöglicht
 */
 if (Crafty) {Crafty.c('Steuerung', Steuerung);}