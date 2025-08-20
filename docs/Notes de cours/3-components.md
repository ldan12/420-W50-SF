# Développer ses propres composants

Le découpage en composants est une pratique essentielle en React Native. Elle permet de rendre votre code plus **modulaire**, **réutilisable** et **lisible**.

---

## Exemple 1

Nous allons créer un petit composant `Titre.tsx` qui reçoit une `string` en **prop** et l'affiche dans un `Text` stylé.

---

## Structure des fichiers

Nous allons déposer nos components dans un répertoire nommé ... **components**

```
/MonApp
  ├── app
  ├── assets
  └── components/
       └── Titre.tsx
```

---

## Étape 1 : Créer le composant `Titre.tsx`

Créez un fichier **.tsx** dans le dossier `components` :

```tsx
// components/Titre.tsx
import { Text, StyleSheet } from "react-native";

//Les propriétés du components, ses données pour le faire fonctionner en quelque sorte
type TitreProps = {
  texte: string;
};

export default function Titre({ texte }: TitreProps) {
  return <Text style={styles.titre}>{texte}</Text>;
}

const styles = StyleSheet.create({
  titre: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "navy",
  },
});
```

### Qu'est-ce qui se passe ici ? :

- On **définit un type `TitreProps`** pour les props du component.
- On exporte une **fonction React** qui reçoit les props et qui render le component.
- On applique un style avec `StyleSheet.create()`.

---

## Utiliser le composant dans l'application

```tsx
// index.tsx
import { View } from "react-native";
import Titre from "./components/Titre";

export default function Index() {
  return (
    <View style={{ padding: 20 }}>
      {/*rappel, les props attendent une string texte, c'est ce qu'on passe ici pour alimenter le composant*/}
      <Titre texte="Bienvenue dans mon app!" />
      <Titre texte="Voici une autre section" />
    </View>
  );
}
```

### Remarque :

- On voit que le composant peut être réutilisé plusieurs fois avec des props différentes, c'est le but.

---

## Exemple 2

Les **props** peuvent aussi faire référence à une action dans le composant parent, on définira dans ce cas-ci une **fonction** dans les propriétés. Considérons cet exemple d'un parent qui utilise un composant représentant un simple bouton :

```tsx
// index.tsx (parent)
import React from 'react';
import { View, Alert } from 'react-native';
import MyButton from './components/MyButton';

export default function Index() {

  //Définition de la fonction qui sera passée au composant
  const sayHello = () => {
    Alert.alert('Bonjour !');
  };

  return (
    <View>
      {/*Utilisation du composant, on remarque que l'on passe une fonction définie dans le parent (sayHello) à la prop (onPressAction) du composant*/}
      <MyButton onPressAction={sayHello} />
    </View>
  );
}
```

```tsx
// MyButton.tsx (le composant)
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

//La prop onPressAction, on lui a attaché le sayHello dans le composant parent
type MyButtonProps = {
  onPressAction: () => void;
};

export default function MyButton({ onPressAction }: MyButtonProps) {
  return (
    {/*appellera le sayHello*/}
    <TouchableOpacity onPress={onPressAction}>
      <Text>Appuie ici</Text>
    </TouchableOpacity>
  );
}
```

Cela permet au composant parent de contrôler le comportement déclenché par une action dans le composant enfant, ce qui favorise la réutilisabilité du composant dans plusieurs contextes.

---

## Rappel des bonnes pratiques

- Un fichier `.tsx` par composant
- Toujours typer les `props`
- Mettre les composants dans un dossier `components/`
- Commencer le nom du fichier par une majuscule : `MonComposant.tsx`
