var myKey = config.myKey;

var searchSpell = angular.module('searchSpell', []);

function searchController($scope, $http){
	$scope.message = 'Message here';

	$scope.getData = function(){
		document.getElementById("searchResult").innerHTML = '';
		var searchString = $scope.text.split(' ').join('+');
		var url = "https://www.goodreads.com/search.xml?key=" + myKey +"&q=" + searchString;

	$.get("http://query.yahooapis.com/v1/public/yql",
    	{
       		q: "select * from xml where url=\""+url+"\"",
        	format: "xml"
    	},
    	function(xml){
    		var x2js = new X2JS();
			var xmlText = new XMLSerializer().serializeToString(xml);
			var jsonObj = x2js.xml_str2json(xmlText);
			//console.log(jsonObj.query.results.GoodreadsResponse.search.results);
			var arrResult = jsonObj.query.results.GoodreadsResponse.search.results;
			console.log(arrResult.work.forEach(function(obj){
				var amazon = obj.best_book.title.split(' ').join('+')
				var bookdepository = obj.best_book.title.split(' ').join('+')
				$('#searchResult').append('<div class="containerResults">' + '<img class="results" src='+obj.best_book.image_url +'></img>' +
				 '<p>Author: '+obj.best_book.author.name+'</p>' + '<p>Book: '+obj.best_book.title+'</p>'+
				 	'<p><a target="_blank" href="https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords='+
				 	amazon+'">Amazon</a></p>' +
				 	'<p><a target="_blank" href="https://www.bookdepository.com/search?searchTerm='+
				 	bookdepository+'">Book Depository</a></p></div>'
				 	)
			}));
    	}
	);
	}	
}