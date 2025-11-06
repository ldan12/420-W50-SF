# Le *Push Button*

## 1. Qu’est-ce qu’un *push button* ?

Un **push button** est un **interrupteur momentané** :  
- Quand on appuie dessus → le circuit se ferme → le courant passe.  
- Quand on relâche → le circuit s’ouvre → le courant ne passe plus.  

Il permet à un microcontrôleur (comme un Arduino ou ESP32) de **détecter une action utilisateur** (clic, validation, contrôle de séquence, etc.).

---

## 2. Branchement typique

Le bouton possède **4 pattes**, mais elles sont en réalité **connectées 2 à 2** (les côtés opposés sont reliés entre eux).

### Schéma courant avec résistance de *pull-down* (externe) :

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

### Variante plus simple : utiliser la résistance  de *pull-up* (interne) de l’Arduino

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
- Sans gestion du *debouncing*, le programme pourrait détecter **plusieurs appuis** pour un seul clic.  

### Solutions possibles :

Avec gestion de délai : 

```cpp
// Attention : HIGH si on utilise une résistance externe
if (digitalRead(buttonPin) == LOW) {
  delay(50); // petit délai pour ignorer les rebonds
  if (digitalRead(buttonPin) == LOW) {
    // vrai appui confirmé, on procède au traitement
  }
}
```

Avec vérification de l'état précédent : 

```cpp
// Attention : LOW si on utilise une résistance externe
// État au repos (non appuyé)
bool lastButtonState = HIGH;

bool buttonState = digitalRead(BUTTON_PIN);
if (lastButtonState == HIGH && buttonState == LOW) {
   //Bouton appuyé, on change l'état (si nécessaire dans le traitement)
  lastButtonState = LOW;
}
```

## 4. Déboguage d'un programme arduino

### Utilisation du port série

La façon la plus simple d'inspecter les chemins que parcourent le code est via l'utilisation du port série, **Platform IO** en rend l'utilisation très facile :

```cpp
void setup() {
  Serial.begin(9600); //Port série configuré à 9600 bauds(*)
}

void loop(){
   Serial.println("Information affichée sur le port série");
}
```

--- 

**(*)** Qu'est-ce qu'un baud ?

Le baud (ou baud rate) représente la vitesse de transmission des données sur une liaison série — c’est-à-dire le nombre de symboles transmis par seconde.

Dans le cas du port série (UART), un symbole = 1 bit, donc : 

9600 bauds = 9600 bits transmis par seconde.

**Pourquoi 9600 est souvent utilisé ?**

C’est la valeur standard historique utilisée par la plupart des cartes Arduino (UNO, Nano, etc.). Elle est très fiable, même sur des câbles longs ou de mauvaise qualité et tous les moniteurs série (dont celui de VS Code / PlatformIO) la reconnaissent par défaut. L'utilisation d'une valeur non compatible mènera souvent à l'inscription de caractères illisibles dans le port série.

---

Pour visualiser les entrées du port série dans **VSCode** :

![cmd](/img/cmdpalette.jpg)

![serial](/img/serial.jpg)

Une fenêtre apparaîtra ensuite dans VSCode afin de visualiser les inscriptions dans le port série.


### Temps d'exécution écoulé

L'utilisation de la fonction `millis()` est très pratique pour obtenir le nombre de millisecondes écoulées depuis le **début de l'exécution** du programme sur le microcontrôleur. On peut se servir du `millis()` pour visualiser des temps d'exécution ou dans le cas des boutons, pour **gérer les appuis courts vs les appuis longs**.-

