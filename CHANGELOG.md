# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.0] 20-06-2023

### Added

-Se agregaron las funcionalidades de Division, Suma, Multiplicacion y Potencia Cuadrada a la ui.
-Se agregaron los test que verifican el correcto funcionamiento de las operaciones antes mencionadas.
-Se agrego un test que verifica que se tire error cuando el resultado de la potencia es mayor a 100.000.
-Se agrego la funcionalidad del boton C, el cual vacia el display.
-Se agrego el test que verifica que el display este vacio luego de pulsar el boton C.

### Fixed

-Se corrigieron errores utilizndo Lint

## [1.3.2] 08-06-2023

### Fixed

- Path donde corre eslint

### Fixed

- Problema al correr tests e2e en Windows

## [1.3.1] 05-06-2023

### Added

- Dependencia cross-env para correr tests e2e

### Fixed

- Problema al correr tests e2e en Windows

## [1.3.0] 05-06-2023

### Added

- Interfaz básica de la calculadora
- ESLint para tests estáticos
- Playwright para tests e2e

## [1.2.0] 15-05-2023

### Added

- Sequelize para el manejo de base de datos
- Tests de integración sobre API y modelo
- Integración continua

## [1.1.0] 20-04-2023

### Added

- Endpoint para la función de resta
- Dependencias para realizar tests
- Tests para la función de resta

## [1.0.0] 17-04-2023

### Added

- Interface CLI para realizar cálculos en forma interactiva
- Base de la API
- Funciones core para realizar suma, resta, multiplicación, división y potencia

[unreleased]: https://github.com/frlp-utn-ingsoft/recalc/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/milagrosmii/recalc/releases/tag/v1.4.0
[1.3.2]: https://github.com/frlp-utn-ingsoft/recalc/releases/tag/v1.3.2
[1.3.1]: https://github.com/frlp-utn-ingsoft/recalc/releases/tag/v1.3.1
[1.3.0]: https://github.com/frlp-utn-ingsoft/recalc/releases/tag/v1.3.0
[1.2.0]: https://github.com/frlp-utn-ingsoft/recalc/releases/tag/v1.2.0
[1.1.0]: https://github.com/frlp-utn-ingsoft/recalc/releases/tag/v1.1.0
[1.0.0]: https://github.com/frlp-utn-ingsoft/recalc/releases/tag/v1.0.0
