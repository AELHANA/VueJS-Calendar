//Debut Returns the ISO week number of the date - Source: https://weeknumber.net/how-to/javascript
Date.prototype.getWeek = function() {
													var date = new Date(this.getTime());
													date.setHours(0, 0, 0, 0);

													date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);

													var week1 = new Date(date.getFullYear(), 0, 4);
													return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
												}

Date.prototype.getWeekYear = function() {
													var date = new Date(this.getTime());
													date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
													return date.getFullYear();
													}
//Fin  Returns the ISO week number of the date - Source: https://weeknumber.net/how-to/javascript
			
//Premier jour du mois 
Date.prototype.pj_Mois = function() { return new Date(this.getFullYear(),this.getMonth(),1);}

//dernier jour du mois 
Date.prototype.dj_Mois = function() { return new Date(this.getFullYear(),this.getMonth()+1,0);}

//premier lundi avant le premier du mois, peut etre le 1 du même mois
Date.prototype.pl_AvMois = function() { var fd = new Date(this.getFullYear(),this.getMonth(),1); 
										fd.setDate(2-((fd.getDay() == 0)?7:fd.getDay()));																	
										return fd;
													}
//premier dimanche apres la fin du mois, peut etre le dernier jour du meme mois
Date.prototype.pd_ApMois = function() { var ld = new Date(this.getFullYear(),this.getMonth(),this.getDate());
										ld.setDate(ld.getDate()+(7-ld.getDay())%7);	
										return ld;
													}

											

	

			
