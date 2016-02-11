$(document).ready(function(){

	function callback(item) {
		if (!item){
			$("body").append("<div> no course added yet </div>");
		} else {
			for (key in item){
				if (item.hasOwnProperty(key)) {
					(function (i) {
						var ccn = item[i];
						var ref = "http://osoc.berkeley.edu/OSOC/osoc?p_term=FL&x=68&p_ccn="+ccn+"&p_classif=--+Choose+a+Course+Classification+--&p_deptname=--+Choose+a+Department+Name+--&p_presuf=--+Choose+a+Course+Prefix%2fSuffix+--&y=11";
						var url = 'https://telebears.berkeley.edu/enrollment-osoc/osc?_InField1=RESTRIC&_InField2='+ccn+'&_InField3=14D2'

						$.ajax({
						type: "POST",
						url: "https://telebears.berkeley.edu/enrollment-osoc/osc",
						data: "_InField1=RESTRIC&_InField2="+ ccn +"&_InField3=14D2",
						headers: {'Referer': ref},
						success: function(info){

							/*
							console.log(i);
							var regEnroll = /\d{1,}\sstudent\Ds\D\sare\senrolled\D\swith\sa\slimit\sof\s\d{1,}/;
							var regWait = /\d{1,}\sstudent\Ds\D\sare\son\sthe\swaiting\slist\D\swith\sa\slimit\sof\s\d{1,}/;
							$("table").append("<tr><td>"+i+"</td><td>"+info.match(regEnroll) +" and "+ info.match(regWait) + "</td></tr>");
							*/

							//var doc = (new DOMParser).parseFromString(info, 'text/html');
							var doc = (new DOMParser).parseFromString(data, 'text/html');
							var text = doc.querySelector('blockquote').querySelector('div').innerHTML;
							console.log(text);
							$("table").append("<tr><td>"+ i +"</td><td>"+ text + "</td></tr>");
							
						}
						}); // end of ajax
					})(key);
				}
			}
		}

	}
	
	function retrieve(fn) {
        	chrome.storage.sync.get(fn);
	}
	
	retrieve(callback);

});

