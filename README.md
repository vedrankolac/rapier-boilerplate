## rapier-boilerplate
Boilerplate for a fast start with three.js materials in rapier physics engine on Oculus Quest 2 VR headset.
- only tested on Oculus Quest 2
- movement is controlled with joystick

### VrControls
After trying a lot of stuf related to Oculus controlers and VR in general (here on GitHub) I have decided to write my own class for Oculus controler, might be usefull for public :)

Try it here
```bash
src/js/World/system/VrControls.js
```

### Quick start
```
npm i
npm start
````

#### GitHub Page
https://birdlaketree.github.io/rapier-boilerplate/

### How to deploy for github pages
```bash
rm -r build
npm run build
npm run deploy
```

### How to inspect in immersive mode
- Open Oculus Developer Hub (it automatically runs ADB and you can use it over WiFi)
- Use Oculus browser to run content (not tested with Firefox Reality)
- Use Chrome to debug `chrome://inspect/#devices`
