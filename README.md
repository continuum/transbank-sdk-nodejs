
# Transbank Node.js SDK

SDK Oficial de Transbank para Node.js

## Requisitos:

- Node.js >= 5.0

# Instalación

### Instalar con `npm`

Instala el SDK en tu proyecto utilizando `npm`: 
```bash
    npm install transbank-sdk
```

También puedes instalarlo agregando la dependencia en tu archivo package.json:
```json
{
  "dependencies": {
    "transbank-sdk": "^1.0"
  }
}
```


## Documentación 

Puedes encontrar toda la documentación de cómo usar este SDK en el sitio https://www.transbankdevelopers.cl.

La documentación relevante para usar este SDK es:

- Documentación general sobre los productos y sus diferencias:
  [Webpay](https://www.transbankdevelopers.cl/producto/webpay) y
  [Onepay](https://www.transbankdevelopers.cl/producto/onepay).
- Documentación sobre [ambientes, deberes del comercio, puesta en producción,
  etc](https://www.transbankdevelopers.cl/documentacion/como_empezar#ambientes).
- Primeros pasos con [Webpay](https://www.transbankdevelopers.cl/documentacion/webpay) y [Onepay](https://www.transbankdevelopers.cl/documentacion/onepay).
- Referencia detallada sobre [Webpay](https://www.transbankdevelopers.cl/referencia/webpay) y [Onepay](https://www.transbankdevelopers.cl/referencia/onepay).

## Información para contribuir y desarrollar este SDK

### Requerimientos
- Typescript
- Plugin de editorconfig para tu editor favorito.

### Estándares

- Para los commits respetamos las siguientes normas: https://chris.beams.io/posts/git-commit/
- Usamos ingles, para los mensajes de commit.
- Se pueden usar tokens como WIP, en el subject de un commit, separando el token con `:`, por ejemplo:
`WIP: This is a useful commit message`
- Para los nombres de ramas también usamos ingles.
- Se asume, que una rama de feature no mezclada, es un feature no terminado.
- El nombre de las ramas va en minúsculas.
- Las palabras se separan con `-`.
- Las ramas comienzan con alguno de los short lead tokens definidos, por ejemplo: `feat/tokens-configuration`

#### Short lead tokens
##### Commits
- WIP = Trabajo en progreso.
##### Ramas
- feat = Nuevos features
- chore = Tareas, que no son visibles al usuario.
- bug = Resolución de bugs.

### Todas las mezclas a master se hacen mediante Pull Request.

### Test
Aún no se han desarrollado tests para este SDK. 

### Deploy de una nueva versión.
Para generar una nueva versión, se debe crear un PR (con un título "Prepare release X.Y.Z" con los valores que correspondan para X, Y y Z). Se debe seguir el estándar semver para determinar si se incrementa el valor de X (si hay cambios no retrocompatibles), Y (para mejoras retrocompatibles) o Z (si sólo hubo correcciones a bugs).

En ese PR deben incluirse los siguientes cambios:

Modificar el archivo `CHANGELOG.md` para incluir una nueva entrada (al comienzo) para X.Y.Z que explique en español los cambios de cara al usuario del SDK.
Modificar el archivo `package.json` para que la propiedad `"version"` apunte a la nueva versión X.Y.Z
Modificar este `README.md` para que los ejemplos usen la nueva versión X.Y.Z


Luego de obtener aprobación del pull request, debe mezclarse a master e inmediatamente generar un release en GitHub con el tag X.Y.Z. En la descripción del release debes poner lo mismo que agregaste al changelog.

Con eso Travis CI generará automáticamente una nueva versión de la librería y la publicará.



You can test this project executing the files on the `showcase` directory,
executing them like `$> node ahowcase/somefile.js`. The test files should
directly link to the compiled library files (for now, later they will be installable
via `npm install`). To compile the TypeScript files from `src`, run `npm run build`

