# angular-wizard

Angular wizard is component module which can be used to develop form wizard. 

Installation 

 npm install angularts-wizard


Now import WizardModule in angular module of your application. 

Uses: 
In template. 
```
<wizard [color]="#ccc">
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <h2>Second part of Form will be here</h2>
  </step>
</wizard>
```
[title] is optional. Default value is Step 1  Step 2 and so on. 

You can set color of steps navigation bottom bar . 
Simply pass  [color]="#ccc"  -- color of your choice in wizard tag. see above template for example. default color is blue. 
For button style add global style of button. 

New updates- Now component emit an event on finish. So if its last step then clicking on finish will emit method .. onFinish
Write onFinish on wizard component and event in it -> (onFinish)="someMethod($event)"

```
<wizard [color]="#ccc" #wizu (onFinish)="someMethod($event)">
  <step [title]="Step one">
    <h2>Form will be here</h2>
  </step>
  <step [title]="Step Two">
    <h2>Second part of Form will be here</h2>
  </step>
</wizard>
```
You can call goTo function from your component ... by getting wizard as @viewChild and then writing this.wizard.goto(1) ..
this will take a parameter as number to go to that step .. 
