# Introduction à Axios et Architecture API dans React Native

## Structure du dossier API

Pour organiser proprement les appels API et les types, voici une structure recommandée avec en exemple la mise en place d'un API de students :

```
/api
├── apiClient.ts        --> Configuration globale d'Axios
├── student             --> Dossier thématique pour l'API des étudiants
│ └── studentApi.ts     --> Fonctions spécifiques aux appels liés aux étudiants
/mappers
├── student             --> Dossier thématique pour le mappage des étudiants
│ └── studentMapper.ts  --> Fonctions de mappage liées aux étudiants
```

## 1. Configuration globale Axios : `apiClient.ts`

On crée une instance Axios centralisée pour réutiliser la même configuration partout.

```ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://example.com/api/", // URL de base pour tous les appels
  timeout: 10000, // Timeout global (en ms)
  headers: {
    "Content-Type": "application/json", // type de transaction
  },
});
```

## 2. Définition des types

La première étape est d'évidemment de bien comprendre le format des données dans les appels d'API qui nous intéressent, ce qui nous permet de construire l'interface de réponse :

Dans un fichier **student.ts** dans le dossier `types` (au niveau de l'application) :

```ts
//Format de la réponse retourné par l'API
export interface StudentListResponse {
  students: ApiStudent[];
  totalCount: number;
}

//Format du student renvoyé par l'API
export interface ApiStudent {
  id: string;
  name: string;
  email: string;
  enrolled: boolean;
}

//autres interfaces de réponse selon l'appel
//...

//Représentation d'un student dans notre application, si elle diffère de celle de l'API
export interface Student {
  id: string;
  fullName: string;
  emailAddress: string;
  isEnrolled: boolean;
}
```

**Note** : On pourrait aussi déclarer un dossier `types` dans le dossier `student` de l'api pour isoler le type de réponse.

## 3. Appel à l'API

Les appels sont regroupés dans le fichier `studentApi.ts`, ce sont des appels asynchrones (**await**) qui livrent type de éponse précis (**Promise**). Il ne fait pas oublier la gestion d'exception :

```ts
import { isAxiosError } from "axios";
import { apiClient } from "@/api/apiClient";
import { StudentListResponse } from "@/types/student";

export const getStudents = async (): Promise<StudentListResponse[]> => {
  try {
    const res = await apiClient.get<StudentListResponse>("students");
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // Erreur http
      throw {
        message: "Erreur lors de l’appel à l’API",
        status: error.response?.status,
        details: error.response?.data,
      };
    }
    throw error; // 500
  }
};
```

L'exemple précédent fait en sorte que la réponse est renvoyée directement à l'application, ce qui peut être très utile pour gérer la **pagination** et le **total** d'éléments reçus. Cette approche impose par contre un **couplage important** entre l'application et l'API ainsi qu'une bonne compréhension de cette dernière au niveau applicatif.

Il est aussi possible de transiger l'objet métier (`Student`), ceci nécessite un mappage au niveau de l'API. Notez la **Promise** de la méthode qui a changé pour `Student`, le mappage etl'appel à l'API qui continue évidemment d'attendre sa réponse. Notez ici l'utilisation de `studentMapper` défini dans la hiérarchie de l'application :

```ts
//studentMapper.ts
export const mapStudentListResponseToStudents = (
  response: StudentListResponse
): Student[] => {
  return response.students.map((s) => ({
    id: s.id,
    fullName: s.name,
    emailAddress: s.email,
    isEnrolled: s.enrolled,
  }));
};

//Autres mappages, ex Student vers ApiStudent dans le cas d'un envoi (post)
//...
```

```ts
import { isAxiosError } from "axios";
import { apiClient } from "@/api/apiClient";
import { StudentListResponse } from "@/types/student";
import { mapStudentListResponseToStudents } from "@/mappers/student/studentMapper";

export const getStudents = async (): Promise<Student[]> => {
  try {
    const res = await apiClient.get<StudentListResponse>("students");
    //Utilisation du mapper
    return mapStudentListResponseToStudents(res.data);
  } catch (error) {
    if (isAxiosError(error)) {
      // Erreur http
      throw {
        message: "Erreur lors de l’appel à l’API",
        status: error.response?.status,
        details: error.response?.data,
      };
    }
    throw error; // 500
  }
};
```

L'exemple précédent réduit le couplage entre l'application et l'API (géré dans le mapper), mais nous fait perdre les métadonnées relatives à la pagination et au total d'éléments.

Le développeur a donc la reponsabilité de choisir la bonne approche selon le contexte applicatif. Certains vont opter pour l'implantation de 2 appels distincts, subvenant aux 2 situations.

## 4. Appel de l'API dans l'application

Un usage judicieux du `useEffect` et du `useState` rend facile l'appel à un API. Attention de mettre en place une logique asynchrone pour la récupération :

```ts
const [students, setStudents] = useState<Student[]>([]);

//dans le useEffect, appelle une méthode de fetching asynchrone qui ira chercher les étudiants :
try {
  const data = await getStudents();
  setStudents(data);
} catch (error) {
  //...
}
```

L'ajout d'un état de chargement sera à préconiser pour les appels d'API, car un indicateur de chargement est souvent de mise dans ce genre de situation :

```ts
const [loading, setLoading] = useState<boolean>(false);
const [students, setStudents] = useState<Student[]>([]);

//On gérera l'état de chargement dans la logique de récupération en n'oubliant pas de le terminer en cas d'erreur !
```
