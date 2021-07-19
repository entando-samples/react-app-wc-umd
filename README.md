## A template for creating a web component to be included into an entando bundle.
### features:
- Web Component
  it creates a web component with shadow dom included
- webpack config
  compiles css (*.style.css) inserting them into the shadow dom. All the *.css will be put into the global html head
  shared react libraries with webpack "externals"
- UMD build format
  enable entando hot reload features
- old plain index.html file as template

The template is compatible with the create-react-app application source

### To develop:
npm start
### To build:
npm run build

### configuration

### To do:
- testing structure
- properties example
- events
