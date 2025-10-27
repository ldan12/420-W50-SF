# Le *Push Button* (Bouton-poussoir) — Présentation complète

## 1. Qu’est-ce qu’un *push button* ?

Un **push button** est un **interrupteur momentané** :  
- Quand on appuie dessus → le circuit se ferme → le courant passe.  
- Quand on relâche → le circuit s’ouvre → le courant ne passe plus.  

Il permet à un microcontrôleur (comme un Arduino ou ESP32) de **détecter une action utilisateur** (clic, validation, contrôle de séquence, etc.).

---

## 2. Branchement typique

Le bouton possède **4 pattes**, mais elles sont en réalité **connectées 2 à 2** (les côtés opposés sont reliés entre eux).

### Schéma courant avec résistance de *pull-down* :

```
   +5V
    │
    │
   [Bouton]
    │
    ├───► Pin numérique (ex: 2)
    │
   [10kΩ] ← résistance de pull-down
    │
   GND
```

Explication :
- Quand le bouton est **relâché**, la résistance tire la broche vers **LOW (0V)**.  
- Quand on **appuie**, la broche est reliée directement à **+5V (HIGH)**.  

### Variante plus simple : utiliser la résistance interne de l’Arduino

```cpp
pinMode(2, INPUT_PULLUP);
```

Dans ce cas :
- Le bouton relie la **broche au GND** quand on appuie.  
- Attention, c'est le contraire ici ! L’état est **LOW quand appuyé**, **HIGH quand relâché**.

---

## 3. Le concept de *debouncing* (anti-rebond)

Quand on appuie sur un bouton, le contact mécanique **rebondit** :  
- Le signal n’est pas net : il passe de 0 à 1 plusieurs fois pendant quelques millisecondes.  
- Sans gestion du *debouncing*, ton programme pourrait détecter **plusieurs appuis** pour un seul clic.  

### Solution :

```cpp
if (digitalRead(buttonPin) == HIGH) {
  delay(50); // petit délai pour ignorer les rebonds
  if (digitalRead(buttonPin) == HIGH) {
    // vrai appui confirmé
  }
}
```
