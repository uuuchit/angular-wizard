# angular-wizard

Angular wizard is component module which can be used to develop form wizard. 

Installation 

 npm install angularts-wizard


Now import WizardModule in angular module of your application. 

Uses: 
In template. 
```
<wizard>
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <h2>Second part of Form will be here</h2>
  </step>
</wizard>
```

You can set color of steps navigation bottom bar . 
Simply pass  [color]="#ccc"  -- color of your choice in <wizard> 
