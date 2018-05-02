//Defining a new component called my-cal
//<my-cal 	@cdmissevt="alert('aucune date selectionnee')"   						emitted when de the calendar is dismissed
// 			@cdateevt="alert('Une date selectionnee ' + $event)"  					emitted when a date is selected, the value is string formatted
//			v-bind:gdate="(new Date(1999,8,1)).toString()" 			 > </my-cal>	gdate is the given date, string formatted (defaults to now() if not given)
Vue.component('my-cal', {
				props: {
					gdate : { type: String, default: (new Date()).toString()}
						},
				data: function () {
						return {
								man  : ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],  // mois de l annee
								jsem : ['l', 'm', 'm', 'j', 'v', 's', 'd'], // jour de la semaine 
								curdate: new Date(this.gdate),				// la date courante du calendrier				
								nowdate : new Date(),						// la date du jour
								sdate : undefined,							// la date selectionnée
								};
							},							
				methods:	{
							///////// Communication with the parent 
							//a date was selected and sent to the parent via the $event parameter  
							vcal : function () { this.$emit('cdateevt', this.sdate.toString());},										
							//Dismiss calendar component  
							dCal : function() { this.$emit('cdmissevt'); },	
							///////// calendar month et year navigation  
							//next year
							nYear: function () { this.curdate = new Date(this.curdate.getFullYear()+1,this.curdate.getMonth(),this.curdate.getDate());  },										
							//previous year 
							pYear: function () { this.curdate = new Date(this.curdate.getFullYear()-1,this.curdate.getMonth(),this.curdate.getDate());  },										
							//next month 
							nMonth: function () { this.curdate = new Date(this.curdate.getFullYear(),this.curdate.getMonth()+1,this.curdate.getDate());  },										
							//previous month 
							pMonth: function () { this.curdate = new Date(this.curdate.getFullYear(),this.curdate.getMonth()-1,this.curdate.getDate());   },										
							///////// calendar day selection management 
							//when a day is clicked
							selDate : function(i, d) {  if (i) { // si on a clique un jour du mois dernier ou du mois suivant 
																this.curdate = new Date(this.curdate.getFullYear(),this.curdate.getMonth()+i,this.curdate.getDate());
																this.sdate = new Date(this.curdate.getFullYear(),this.curdate.getMonth(), d);
																}
														else { if (this.isSelected(i,d)) this.sdate = undefined;
															   else this.sdate = new Date(this.curdate.getFullYear(),this.curdate.getMonth(),d); 
															}
																		  
													},										
							//go to the month of the selected day 
							goSelDate : function () { this.curdate = new Date(this.sdate.getFullYear(),this.sdate.getMonth(),this.sdate.getDate());},										
							//is d equal to today's date, d is the day number in the current month and year in curdate 
							isToday: function (d) { return (( this.nowdate.getDate() == d) && ( this.nowdate.getFullYear() == this.curdate.getFullYear()) && ( this.nowdate.getMonth() == this.curdate.getMonth()) ) ; },
							//is d equal to the selected date, d is the day number in the current month and year in curdate 
							isSelected : function (i, d) { return ( (i == 0) && (this.sdate != undefined) && ( this.sdate.getDate() == d) && ( this.sdate.getFullYear() == this.curdate.getFullYear()) && ( this.sdate.getMonth()  == this.curdate.getMonth() ) ); } ,
							//is there any selected day 
							anySel : function () { return (this.sdate != undefined); },
							///////// building the calendar matrix  
							j_Mois : function (c) {
										var jm = new Array(); 				// les jours du mois organises en semaines 
										var sem = new Array(); 				// tableau contenant les jous de la semaine
										var fd = c.pj_Mois(); 				// on se positionne sur la premiere date du mois 
										var ld = c.dj_Mois(); 				// dernier jour du mois 
										var m = c.getMonth();				// mois courant			
										var nSem; 							// Numero de la première semaine 
										// petite fct locale, nm et cm deux mois, renvoie 0 si egaux, -1 si nm avant cm et +1 sinon 
										var pos = function (nm, cm) {
																if ((cm == 11) && (nm ==0)) return (1);
																if ((cm == 0) && (nm == 11)) return (-1);
																return (nm - cm);
										}
										//alert ( 'premier jour du mois ' + fd.toString());
										//alert ( 'dernier jour du mois ' + ld.toString());
										fd = fd.pl_AvMois();
										ld = ld.pd_ApMois();
										//alert ( 'premier lundi du mois avant debut du mois ' + fd.toString());
										//alert ( 'dernier jour du mois ou premier dimanche apres fin du mois ' + ld.toString());	
										nSem = (fd.getWeek() == 53)?1:fd.getWeek();
										for ( ; fd<=ld ; fd.setDate(fd.getDate()+1))
											{ 	sem.push({ in : pos(fd.getMonth(),m), d : fd.getDate()});
												if (fd.getDay() == 0) { var jSem = new Object();
																		jSem.nSem = nSem;
																		jSem.sem = sem;
																		jm.push(jSem);
																		sem = new Array();
																		nSem = (++nSem == 53)?1:nSem;
																	}
				  				
											}
										return jm;
									},
							},
				computed:	{
							// Calcul la liste des jours du mois
							// sems est un array, chaque element est un array associatif 
							//(nSem, liste des jours de la semaine, chaque jour de la semaine est un ouple (in, date))
							sems: function () { return this.j_Mois(this.curdate); },
							// entete de la date du mois 
							entDate : function() { return (this.man[this.curdate.getMonth()] + " " + this.curdate.getFullYear() ); },
							// entete de la date selectionnee
							entSdate : function() { return ( this.sdate.getDate() + " " + this.man[this.sdate.getMonth()] + " " + this.sdate.getFullYear() ); }, 
							},
				template: 	`<div class="month">		
									<div class="weekHead"> <!-- calendar first row  : heading -->		
											<div class="day"><a @click="pYear" href="#">&lsaquo;&lsaquo;</a></div>
											<div class="day"><a  @click="pMonth" href="#">&lsaquo;</a></div>
											<div class="calHead">{{entDate}}</div>
											<div class="day"><a @click="nMonth" href="#">&rsaquo;</a></div>
											<div class="day"><a @click="nYear" href="#">&rsaquo;&rsaquo;</a></div>
									</div>		
									<div class="week">	<!-- calendar second row  : days of the week -->	
											<div class="day weekNB"><a @click="dCal" href="#">&#x2717;</a></div>
											<div class="day" v-for="nj in jsem"> {{ nj }}</div>
									</div>		
									<!-- sems is anassociative array (week number, week days), each day is an object {in (-1, 0, 1), date (day order in the month) }-->
									<div class="week" v-for="sem in sems"> <!-- calendar week days  -->	
											<div class="day weekNB">{{ sem.nSem }}</div> 
											<div class="day" 
													v-for="j in sem.sem" 
													v-bind:class="{ inMonth: (j.in == 0), 
																	postMonth : (j.in == 1), 
																	preMonth :  (j.in == -1),
																	today: ((j.in == 0) && isToday(j.d)), 
																	clicked: isSelected(j.in, j.d) }" 
													@click="selDate(j.in, j.d)" > {{ j.d }}
											</div>
									</div>
									<div class="weekHead" v-if="anySel()">	<!-- calendar last row : selected day il any  -->		
											<div class="calHead"><p @click="goSelDate" @dblclick="vcal" >{{entSdate}}</p></div>
									</div>						
							</div>`
				
			});
	