# Le *Joystick*

## 1. Qu’est-ce qu’un *Joystick* ?

Le *joystick* est un capteur analogique permettant de détecter des mouvements dans deux directions principales :

- X (horizontal) : gauche / droite
- Y (vertical) : haut / bas

Il est souvent équipé d’un bouton poussoir intégré pour effectuer une action lors de l’appui.

Broches typiques, le X et le Y sont sur des broches **analogues**, le bouton est sur une pin digitale :

- JOY_X → axe horizontal
- JOY_Y → axe vertical
- JOY_BTN → bouton

## 2. Lecture des pins

Seule la pin du bouton sera configurée en *pinMode*. Tout comme le *push button* on utilisera la résistance interne du micro-contrôleur :

```cpp
pinMode(JOY_BTN, INPUT_PULLUP);
```

**Rappel** : L'état *LOW* signifie que le courant passe, le contraire pour *HIGH*

Pour lire les données :

```cpp
int xVal = analogRead(JOY_X);  // 0 (gauche) → max (droite)
int yVal = analogRead(JOY_Y);  // 0 (haut) → max (bas)
int swVal = digitalRead(JOY_BTN); // LOW si appuyé, HIGH si relâché
```

Les valeurs possibles en X et en Y varient de **0 à 4095**. Lorsque le *joystick* est au neutre, sa position est au centre, soit **2048**.

La zone de repos (zone pour laquelle on ne détectera pas d'action du *joystick*) est souvent considérée entre **1000 et 3000**, ce qui fait que ces 2 valeurs deviennent les bornes de détection :

```cpp
void loop() {
  int xVal = analogRead(JOY_X);  
  int yVal = analogRead(JOY_Y);  
  int swVal = digitalRead(JOY_BTN);

  if (yVal < 1000) {
      // Joystick vers le haut
  } else if (yVal > 3000) {
      // Joystick vers le bas
  }

  if (xVal < 1000) {
      // Joystick vers la gauche
  } else if (xVal > 3000) {
      // Joystick vers la droite
  }
}
```

On remarque que la boucle ici n'a pas de *delay* afin d'offrir une expérience plus fluide. Il faut faire cependant attention car maintenir le *joystick* enfoncé dans une direction provoquerait des lectures à répétition. Ce phénomène se controle facilement avec la capture du mouvement et un délai raisonnable de 200 ms :

```cpp
void loop() {
  int xVal = analogRead(JOY_X);  
  int yVal = analogRead(JOY_Y);  
  int swVal = digitalRead(JOY_BTN);

  static unsigned long lastMove = 0; ///statique !!
  unsigned long now = millis();

  if (now - lastMove > 200) {
    if (yVal < 1000) {
        // Joystick vers le haut
        lastMove = now;
    } else if (yVal > 3000) {
        // Joystick vers le bas
        lastMove = now;
    }

    if (xVal < 1000) {
        // Joystick vers la gauche
        lastMove = now;
    } else if (xVal > 3000) {
        // Joystick vers la droite
        lastMove = now;
    }
  }
}
```

Dans le code précédent, si l'on maintient le *joystick* dans sa position, on effectuera l'action cible au 200 ms (défilement d'un menu par exemple).

## 3. Debouncing du bouton

Pour le clic du bouton, nous observons ici le même phénomène de **debouncing** qu'avec le *push button. Ce phénomène peut être réglé de la même façon :

```cpp
  bool buttonPressed = false;

  if (swVal == LOW && !buttonPressed) {
    buttonPressed = true;
  } else if (swVal == HIGH) {
    buttonPressed = false;
  }
```


