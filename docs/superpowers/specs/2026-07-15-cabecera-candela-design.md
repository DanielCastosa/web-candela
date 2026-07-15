# Diseño de la cabecera Candela

## Objetivo

Añadir una cabecera editorial independiente antes de las tres secciones existentes. Mientras el centro de la pantalla esté en la cabecera, el menú flotante permanece visible pero sin ningún elemento seleccionado. Al entrar en una sección, el elemento correspondiente se marca automáticamente.

## Dirección visual

- Cabecera: fondo rosa `#FFE4ED` y texto/acento `#F86494`.
- Sección 1: fondo verde `#E8FFDB` y acento `#52B68D`.
- Sección 2: fondo morado `#ECCFFF` y acento `#784EA6`.
- Sección 3: fondo amarillo `#FFF6BE` y acento `#FBCB18`.
- Título: “Candela” en Molle, con una escala muy grande y una composición editorial inspirada en el boceto.
- Subtítulo: “Moda con alma, estilo con luz.” en una sans serif del sistema.
- Imagen: `maniqui1.png`, recortada con transparencia, integrada en el extremo superior derecho y solapándose visualmente con el título sin impedir su lectura.

## Estructura responsive

La cabecera ocupa como mínimo un viewport completo. En desktop, el contenido textual se sitúa a la izquierda y el maniquí ocupa la franja derecha; el título se extiende por la zona inferior del hero. En móvil, el título conserva protagonismo y el maniquí se reduce y se desplaza a la derecha para evitar desbordamiento horizontal.

Las tres secciones continúan vacías y cada una ocupa un viewport completo. El menú conserva tres enlaces y adopta el color de fondo de la pantalla activa; el elemento marcado usa el acento asociado. En la cabecera el menú usa el rosa, pero no expone `aria-current` en ningún enlace.

## Comportamiento

- El scroll-spy trabaja con cuatro superficies: cabecera y tres secciones.
- La cabecera produce un estado activo `null`.
- Los clics del menú desplazan suavemente a la sección, respetando `prefers-reduced-motion`.
- Los cambios de sección actualizan `aria-current`, el hash y las variables cromáticas del menú.
- La navegación por hash directo mantiene el elemento correcto.

## Accesibilidad y calidad

El título usa un `h1`, la cabecera tiene etiqueta accesible y la imagen tiene texto alternativo. Se conservan estados de foco visibles, contraste legible, respeto a movimiento reducido y ausencia de scroll horizontal. La validación cubre lógica unitaria, navegación E2E, desktop de 1440×900 y móvil de 390×844.
