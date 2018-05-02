# VueJS-Calendar
A VueJS component Calendar 
This code is meant to show how easy it is to construct au javascript calendar using VueJS.
You can find the component defnition in the file cal.js

To use this component in your HTML file, just insert the following element 
<my-cal 	@cdmissevt="alert('aucune date selectionnee')"   						
		@cdateevt="alert('Une date selectionnee ' + $event)"  					
	         v-bind:gdate="(new Date(1999,8,1)).toString()" 			 
> 
</my-cal>	

gdate is the given date, string formatted (defaults to now() if not given)
This component emits two events : 
cdmissevt  --> emitted when de the calendar is dismissed
cdateevt   --> emitted when a date is selected, the value is string formatted

--------------------
Somme utility methods have been added to Obejct DATE ( see ladate.js file)