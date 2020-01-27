# La cagamos. 

Desarrollamos open source porque creemos que es un modelo colaborativo superior para desarrollar ciertos productos [e incluso hemos inspirado a otros  a hacerlo](https://medium.com/mejorindustriati/por-qu%C3%A9-regalar-tu-c%C3%B3digo-es-una-buena-idea-6f0ca7f8cd49). Hoy, en esa línea [desarrollamos herramientas de integración *abiertamente* acá en Github](https://github.com/TransbankDevelopers/), donde los avances en cada producto en progreso (e incluso nuestras discusiones) son visibles por cualquier persona con acceso a internet.

En ese trabajo en progreso, usamos otro código opensource y *fallamos tanto en dar la atribución correcta como en el licenciamiento correcto* para el código que adaptamos. [Citamos](https://github.com/continuum/transbank-sdk-nodejs/commit/843d8961d5f0533c87f84bbc5349ec0759341e70#diff-1daa783be39c4db03506389c074404b6R1) (desde antes que surgiera la polémica) que el código venía desde [otro repositorio](https://github.com/rgcl/webpay-nodejs), pero no advertimos que la [licencia declarada durante el trabajo en progreso (BSD-3)](https://github.com/continuum/transbank-sdk-nodejs/blob/feat/add_webpay_plus/package.json#L48) no era compatible con la [licencia de ese otro repo](https://github.com/rgcl/webpay-nodejs/blob/master/COPYING) que es la LGPL. 

Eso fue un error. La cagamos y ofrecemos como equipo (y personalmente) las disculpas que corresponden. El opensource depende de que se respeten las licencias y la autoría. No le hacemos un favor al opensource cuando no nos fijamos en estos importantes detalles, aunque haya sido un producto en incipiente desarrollo. El error fue 100% nuestro, de Continuum.

**Y en ningún caso hemos tenido la intención de apropiarnos de nada**. Si hubiéramos querido hacerlo, habríamos desarrollado en un repositorio privado en lugar de tener un repositorio público con nuestros avances. Seríamos bien pavos si quisiéramos esconder la copia renombrando variables (o comentando código) y lo dejamos en commits públicos acá en Github 🤦🏻‍♂️ 

Personalmente invito a quien quiera que tenga dudas a que me escriba por [twitter](https://twitter.com/leosoto) o a mi correo <leo.soto arroba continuum punto cl>. 

— Leo Soto, socio de Continuum.

## Lo que sigue.

- Subimos [este repositorio](https://github.com/continuum/transbank-sdk-nodejs) para transparentar lo que hicimos (con errores incluidos) y arreglarlo. 

- Vamos a corregir [este repositorio](https://github.com/continuum/transbank-sdk-nodejs) para que tenga la licencia correcta (LGPL) y un archivo que reconozca la autoría.

- Vamos a comenzar un desarrollo completamente desde cero para que las herramientas de integración oficiales que publicamos puedan tener la licencia BSD (que es mas permisiva/amistosa con los comercios que utilizan esas librerías y quieren modificarlas). Ese desarrollo también será abierto y público.

## Y cómo evitaremos que nos pase de nuevo.

- Revisaremos el código opensource que hemos hecho para buscar posibles casos similares.

- Seguiremos trabajando abiertamiente commit a commit. Pero mejoraremos los canales para que, cuando nos reporten un problema similar, respondamos mucho mejor.

- Buscaremos herramientas que nos ayuden a detectar estas cosas de manera automatizada.

# README anterior

You can test this project executing the files on the `showcase` directory,
executing them like `$> node ahowcase/somefile.js`. The test files should
directly link to the compiled library files (for now, later they will be installable
via `npm install`). To compile the TypeScript files from `src`, run `npm run build`

