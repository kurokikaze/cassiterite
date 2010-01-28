var tyrant = require("./tyrant");
var sys = require('sys');

var c = tyrant.connect();
c.addListener("connect", function (){

    /* tyrant.put('blog1', 'type', 'blog', 'name', 'Blog entry 1', 'text', 'First entry text');
    tyrant.put('blog2', 'type', 'blog', 'name', 'Blog entry 2', 'text', 'Second entry text');
    tyrant.put('blog3', 'type', 'blog', 'name', 'Blog entry 3', 'text', 'Second entry text');*/

    /* tyrant.put('blog4', 'type', 'blog', 'name', 'Days of Summer', 'text', 'First entry text');
    tyrant.put('blog5', 'type', 'blog', 'name', 'Strange presentiment', 'text', 'Second entry text');
    tyrant.put('blog6', 'type', 'blog', 'name', 'Requiem for Another World', 'text', 'Second entry text');
    tyrant.put('blog7', 'type', 'blog', 'name', 'Running After You', 'text', 'Second entry text');
    tyrant.put('blog8', 'type', 'blog', 'name', 'Fuego Frio', 'text', 'Second entry text');*/

    /* tyrant.setindex('name', tyrant.ITLEXICAL).addCallback(function(value) {
        sys.puts('Index : ' + value);
    }).addErrback(function(error) {
        sys.puts('Error : ' + error);
    });*/

    // sys.puts('Indices are set');

    /*tyrant.get('blog1').addCallback(function(value) {
        value=tyrant.dict(value);
        sys.puts('Name = '+value.name);
        sys.puts('Text = '+value.text);
    }); */

    tyrant.search(tyrant.starts('name', 'R'), tyrant.sort('name', 'asc')).addCallback(function(value) {
        for (item in value) {
            tyrant.get(value[item]).addCallback(function(item) {
                var item = tyrant.dict(item);
                sys.puts('##' + item.name);
                sys.puts(' ' + item.text);
                sys.puts('---------------');
            });
        }
    }).addErrback(function(error) {
        sys.puts('Search Error : ' + error);
    });

    return true;
});
