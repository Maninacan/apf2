#Neues Frontend für apflora.ch

verwendet:

- [react-boilerplate](https://github.com/mxstbr/react-boilerplate)
- [mobX](https://github.com/mobxjs/mobx)
- [socket.io](http://socket.io/)

##Ziele:

- mehrere Projekte verwalten
- Die Daten in der Benutzeroberfläche werden laufend aktualisiert, wenn mehrere Personen gleichzeitig arbeiten
- Grundlage schaffen, um Berichte direkt aus der Webanwendung heraus produzieren zu können
- Grundlage schaffen, um auf das Access-Admin-Tool zu verzichten
- Architektur modernisieren
- Unterhalt- und Erweiterbarkeit verbessern
- es soll künftig einfacher und mit weniger Risiko verbunden sein, neue Features einzuführen
- einige in der alten Architektur schwierig zu lösende Fehler beheben
- veraltete Abhängikeiten loswerden (z.B. jsTree 2)
- (Infra-)Struktur für Tests bereitstellen
- nach und nach Tests einführen
- Sicherheit erhöhen
- URL ist Teil des Flux-Stores, steuert die Benutzeroberfläche und das Laden von Daten. Vorteile:
  - fast alles ist verlinkbar
  - auf einen Router kann verzichtet werden
