$(document).ready(function(){

//load
chrome.storage.sync.get(function(item) {
	for (key in item) {
		if (item.hasOwnProperty(key)) {
			(function (i) {
				console.log(i);
				$("#list").append("<li>"+i+"<button class='list_button' id='"+i+"'>"+"Remove this class"+"</button></li>");
			})(key);
		}
	}
	
	$(".list_button").click(function() {
		chrome.storage.sync.remove(this.id);
	});
});

//load

function onSave(){

	var dept = document.getElementById("p_deptname").value.replace(/\s/, "+");
	var course = document.getElementById("p_course").value;
	var ccn = document.getElementById("ccn").value;
	//var classtype = document.getElementById("classtype").value;
	//var session = document.getElementById("session").value;
	
	if(dept || course || ccn) {
		if(!ccn){
			if (!dept || !course) {
				alert('no sufficient info');
			} else {
			var url = "http://osoc.berkeley.edu/OSOC/osoc?p_term=FL&x=39&p_classif=--+Choose+a+Course+Classification+--&p_deptname="+dept+"&p_presuf=--+Choose+a+Course+Prefix%2fSuffix+--&y=9&p_course="+course;
			}

		} else {
		var url = "http://osoc.berkeley.edu/OSOC/osoc?p_term=FL&x=68&p_ccn="+ccn+"&p_classif=--+Choose+a+Course+Classification+--&p_deptname=--+Choose+a+Department+Name+--&p_presuf=--+Choose+a+Course+Prefix%2fSuffix+--&y=11";
		}

		function callback(data) {
			
			var $html = $(data);
			var $table = $html.filter("table:contains('Course:')");
			var bool = $html.is("table:contains('Course:')");
			console.log(bool);
			console.log($table);			

			if ($table.length !== 0) {

				if (!ccn) {
					var parse = data.match(/\d{5}\s/);
					ccn = parse[0].match(/\d{5}/);
					
				}
				
				/*
				var splitCourse = data.slice(data.indexOf("Course:")+("Course:&nbsp;</B>").length);
				var key = splitCourse.slice(splitCourse.indexOf("<B>")+3, splitCourse.indexOf("</B>"));
				var obj = new Object;
				obj[key] = ccn;
				*/

				//fix this
				var regex = /[a-zA-Z0-9_ ]+00[0-9]\sLEC/;

				var $key = $table.find("b").filter(function () { 
							console.log(this.textContent, regex.test(this.textContent));
							//console.log(this, typeof this);	
							return regex.test(this.textContent); }
						);

				if ($key.length > 1) {
					$key = $key[0];
				}

				var obj = new Object;
				var cname = $key.text();
				console.log(cname);
				obj[cname] = ccn;
				
				chrome.storage.sync.set(obj, function() { //this function for testing.
					chrome.storage.sync.get(function(items) {
						console.log("check multiple saves: ", items);
					});
				});
		
			} else  {
				alert("No class found");
			}
		}
		$.get(url, callback);
	} // end if
	else { // no input
		alert('You did not add any class');
	}

}

document.getElementById('save').addEventListener('click', onSave);
});

chrome.storage.onChanged.addListener(function() {
	location.reload();
});
