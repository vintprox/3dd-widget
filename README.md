# 3dd-widget

> Compact API for 3DDashboard widget

This library offers straight convenient way to approach 3DEXPERIENCE web services via widget. What it does is:
- performing **authentication requests** before accessing corresponding 3DEXPERIENCE services (right now, for 3DSpace and 3DSwym, but it's easy to extend);
- providing abstract **class** `Service` with static `request` method;
- retrieving URLs of required services and binding them to appropriate `SV*` classes, allowing you to make **request by URI** rather than full URL;
- incrementing confidence in code you write with **TypeScript** support (everything has types and comments).

**3dd-widget** requires running in browser with ECMAScript 2015 support (good thing is that modern browsers support it).

## Installation
Package requires [Node.js](https://nodejs.org/en/download/). If it's installed, run:
```bash
$ npm install 3dd-widget
```

Plus this is very good to use it with bundler like Webpack, so everything's imported correctly.

> Remember that you must export script as AMD module to work with global `widget` object in UWA frame. Though library does not need it for most things.

## Example

```js
import { Widget } from '3dd-widget';
import { SV3DSpace } from '3dd-widget/dist/services';

export default class extends Widget {
  constructor() {
    super({
      removeDefaultStyles: true
    });
    init();
  }

  async init() {
    widget.body.innerText = 'Hello World!';

    await Widget.fetchServices([SV3DSpace]);
    // If fail occured, next code will not run.

    // `await` keyword in `async` function returns resolved value from child Promise
    // Get projects as plain object:
    const projects = await SV3DSpace.get('/resources/v1/modeler/projects');
    console.log(projects);
  }
}
```

You also can implement custom class and extend from it:
```js
// VueWidget.ts
import { Widget, Service } from '3dd-widget';
import Vue from 'vue';

export default class VueWidget extends Widget {
  constructor(App: typeof Vue, services: typeof Service[]) {
    super({
      removeDefaultStyles: true
    });
    new Vue({
      el: '.moduleContent',
      render: h => h(App)
    });
    Widget.fetchServices(services);
  }
}
```
```js
// ChildWidget/index.ts
import { SV3DSpace } from '3dd-widget';
import VueWidget from '../VueWidget';
import App from './App.vue';

export default class ChildWidget extends VueWidget {
  constructor() {
    super(App, [SV3DSpace]);
  }
}
```

## Extras
**3dd-widget** also provides TypeScript shims for perceiving modules starting with `UWA`, `DS` and RequireJS loader plugins as not part of Node.js modules, which essentially makes TypeScript compilation work with these. It implicates usage within 3DDashboard widget frame, of course. We only have `DS/WAFData/WAFData` almost fully declared.

## Build
```bash
$ npm run build
# or
$ npx tsc
```
