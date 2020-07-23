Сейчас мы создадим проект Angular в котором обустроим гибкий подход для легкого масштабирование и изменение стилей в проекте.
[Репозиторий с завершенным уроком]

### Создаем проект

Создаем проект `example-themes`, устанавливаем префикс `exl`, указываем стили `scss`.
```shell 
ng new example-themes --prefix=exl --style=scss --routing=false
```

Заходим в папку проекта 
```shell
cd example-themes/src/
```


### Создаём файл `_theme.scss`

Создаем папку `styles`
```shell
mkdir styles
cd styles
```

Создаём файл `_theme.scss`.
Этот файл хранит в себе глобальные переменные, миксины и функции.  
*_theme.scss*
```css 
$exl-surface: white !default;
$exl-background: lightgray !default;
$exl-primary: blue !default;
$exl-secondary: darkgrey !default;
$exl-error: red !default;
$exl-warn: yellow !default;
$exl-hint: lightblue !default;
$exl-success: green !default;
```
Больше про цвета и использование их можно прочитать на [Material design color].

### Сделаем `_theme.scss` глобальным
Указываем в `angular.json` папку `styles` с файлом `_theme.scss` доступным для каждого scss файла.  
*angular.json*
```json
...
"projects": {
    "example-themes": {
      "architect": {
        "build": {
          "options": {
            ...
            "stylePreprocessorOptions": {
              "includePaths": [
                "src/styles"
              ]
            },
            ...
...
```

### Создаем тестовый компонент

Заходим в папку `app` и создаем компонент `example`.
``` shell
ng g c example
```
<cut/>
Пример разметки:  
*example.component.html*
```html
<div class="card">
  <a class="link" href="">Link</a>
  <button class="button secondary">Button</button>
</div>
```

Пример стилей:  
*example.component.scss*
```scss
@import "theme";

.card {
  background: $exl-surface;
}

.link {
  color: $exl-primary;
}

.button.secondary {
  color: $exl-secondary;
}

```

Добавляем компонент  в `app`.  
*app.component.html*
```html
<exl-example></exl-example>
```

Добавим стилей в `styles.scss`.  
*styles.scss*
```scss
@import "theme";

body {
  background: $exl-background;
}
```

Запускаем проект и видим что наши стили успешно применились.
```shell
ng serve
```

#### Готово, мы освоили базу
Теперь мы знаем как глобально описать переменные. 

### Время создать несколько тем

###### Создаем дополнительную тему

Создадим папку `/prebuild-themes` внутри `/src`.
```shell
cd ../
mkdir prebuild-themes
cd prebuild-themes
```

Добавим файл `_green-theme.scss` и переопределим основной цвет.  
*_green-theme.scss*
```scss
// Override primary color
$exl-primary: green;
$exl-background: black;

// Upload application styles
@import "../styles.scss";
```

Установим в `angular.json` сборку нашей новой темы.  
*angular.json*
```
            ....
            "extractCss": true,
            "styles": [
              "src/styles.scss",
              {"input": "src/prebuild-themes/_green-theme.scss", "lazy": true, "bundleName": "themes/green-theme"}
            ],
            ...
```

Соберем проект и увидим нашу собранную тему в папке `/dist/themes/` в файле `green-theme.css`
```shell
ng build
```

Добавим скрипт, который будет подменять стили и загружать `green-theme.css`.  
*app.component.ts*
```ts
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'exl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    document.head.appendChild(el);
    el.setAttribute('href', './themes/green-theme.css');
  }
}
```
Запускаем проект и видим что фон успешно изменился, но стили внутри компонента не поменялись.
Потому что стили были сгенерированные во время компиляции компонента.
Что бы это обойти нужно вынести стили из компонента - глобально.

###### Переопределяем стили компонента

Заходим в папку `/app` и создаем компонент `example-v2`.
``` shell
ng g c example-v2
```

Копируем разметку:  
*example-v2.component.html*
```html
<div class="card">
  <a class="link" href="">Link</a>
  <button class="button secondary">Button</button>
</div>
```

Создаем `example-v2-theme.scss` и копируем стили из `example.component.scss`.  
*example-v2-theme.scss*
```
@import "theme";

.card {
  background: $exl-surface;
}

.link {
  color: $exl-primary;
}

.button.secondary {
  color: $exl-secondary;
}
```
Импортируем стили из `styles.scss`.  
*styles.scss*
```
...
@import "src/app/example-v2/example-v2-theme";

```

Добавляем компонент  в `app`.  
*app.component.html*
```html
...
<exl-example-v2></exl-example-v2>
```

Запускаем и видим что стили успешно изменились.
 
### Готово, мы освоили как создавать новые темы
Теперь мы знаем как создавать несколько тем, и их подменять, а также менять стили внутри компонентов зависимо от темы.

### Последнее действие - улучшаем

Расширяем файл с темой, добавляем переменную тема.  
*theme.scss*
```scss
...
$exl-theme: (
  surface: $exl-surface,
  background: $exl-background,
  primary: $exl-primary,
  secondary: $exl-secondary,
  error: $exl-error,
  warn: $exl-warn,
  hint: $exl-hint,
  success: $exl-success
) !default;
```

Создаем `example-v3-theme` и прокидываем тему в миксин.  
*example-v3-theme.scss*
```scss

@mixin example-v3-theme($theme) {
  $e-surface: map-get($theme, surface);
  $e-primary: map-get($theme, primary);
  $e-secondary: map-get($theme, secondary);

  .card {
    background: $e-surface;
  }

  .link {
    color: $e-primary;
  }

  .button.secondary {
    color: $e-secondary;
  }

```

Выполняем создание стилей  
 *styles.scss*
```scss
...
//@import "app/example-v2/example-v2-theme";
@import "app/example-v2/example-v3-theme";
@include example-v3-theme($exl-theme);
```

### В завершении
Мы с вами настроили генерацию тем их подмены, а также решили сопутствующие проблемы.   
Последующее развитие:  
Разбить файл `_theme.scss` на `_variables.scss`, `_typography.scss` и тд.  
 Примеры: [Angular material theme] , [Bootstrap] , [Material design theme] .  
Размещать компоненты отдельными `packages` и публиковать в `npm`.  
Следовать гайдам [Angular styles guide], [Angular material guide].   
[Репозиторий с завершенным уроком].


[Material design color]: https://material.io/design/color/the-color-system.html#color-theme-creation
[Angular material theme]: https://github.com/angular/components/tree/master/src/material/core/theming

[Bootstrap]: https://github.com/twbs/bootstrap/blob/main/scss

[Material design theme]: https://github.com/material-components/material-components-web/tree/master/packages/mdc-theme

[Angular styles guide]: https://angular.io/guide/styleguide#extract-templates-and-styles-to-their-own-files

[Angular material guide]: https://github.com/angular/components/blob/master/CODING_STANDARDS.md#css

[Репозиторий с завершенным уроком]: https://github.com/Kaskyi/example-themes

<cut/>
