var nerve = require('./nerve/nerve');
var tyrant = require('./tyrant/tyrant');
var querystring = require('./querystring/querystring');
var Mu = require('./mu/mu');

Mu.templateRoot = './theme';

var get = nerve.get;
var post = nerve.post;

var getPostParams = function(req, callback) {
  var body = '';
  req.addListener('body', function(chunk){body += chunk;})
     .addListener('complete', function(){
       callback(unescape(body.replace(/\+/g,' ')));
     });
};

var hello = [
    ["/", function(req, res) {
        var page_text = '';

        tyrant.connect();
        tyrant.addListener('connect', function() {
            tyrant.search(tyrant.is('type', 'blog'), tyrant.sort('time', 'desc')).addCallback(function(value) {
                // page_text += '<h1>My small node blog</h1>';

                // page_text += '<div class="entries">';
                var posts = [];
                for (item in value) {
                    tyrant.get(value[item]).addCallback(function(raw_item) {

                        // page_text += '<div class="entry">';
                        var item = tyrant.dict(raw_item);


                        // page_text += '<h3>' + item.name + '</h3>';
                        /* if (item.time) {

                            page_text += '<div class="post_date">Date: ' + post_date.getDate() + '.' + (post_date.getMonth() + 1) + '.' + post_date.getFullYear() + ' ' + post_date.getHours() + ':' + post_date.getMinutes() + ':' + post_date.getSeconds() + '</div>';
                        }*/
                        var post_date = new Date(parseInt(item.time));
                        var page = {
                            id:item.id,
                            title:item.name,
                            date: post_date.getDate() + '.' + (post_date.getMonth() + 1) + '.' + post_date.getFullYear() + ' ' + post_date.getHours() + ':' + post_date.getMinutes() + ':' + post_date.getSeconds(),
                            text: item.text
                        };
                        // page_text += '<p>' + item.text + '</p>';
                        // page_text += '</div>';
                        posts.push(page);
                    }).wait();
                }
                // page_text += '</div>';

                // page_text = '<html><head><title>My blog</title></head><body>' + page_text + '</body></html>';
                var page = {'title':'My small Node blog', 'posts': posts, 'pages':[]};
                Mu.render('page.html', page, {chunkSize: 10}).addCallback(function (output) {

                    var buffer = '';

                    output
                      .addListener('data', function (c) {
                        buffer += c;
                      })
                      .addListener('eof', function () {
                        res.respond(buffer);
                      });
                  })
                  .addErrback(function (e) {
                    res.respond('Oops:' + JSON.stringify(e));
                  });

                // res.respond(page_text);
            });
        });
    }],
    ["/write", function(req, res) {
        var page_text = '';

        page_text += '<h1>My small node blog</h1>';

        page_text += '<h2>Write new blog entry</h2>';

        page_text += '<form method="POST" action="/save">';

        page_text += '<label for="title">Post title</label><br/><input type="text" name="title" /><br/>';

        page_text += '<label for="body">Post body</label><br/><textarea cols="80" rows="24" name="body" >Enter post body</textarea>';

        page_text += '<input type="submit" value="Save post" />';

        page_text += '</form>';

        page_text = '<html><head><title>My blog</title></head><body>' + page_text + '</body></html>';

        res.respond(page_text);
    }],

    [post('/save'), function(req, res) {

        // Save post to Tyrant
        getPostParams(req, function(data) {
            tyrant.connect();
            tyrant.addListener('connect', function() {
                var post = querystring.parse(data);
                post.time = (new Date()).getTime();
                tyrant.put('blogentry' + post.time, 'type', 'blog', 'name', post.title, 'text', post.body, 'time', post.time.toString());
                res.respond('Post saved succesfully. <a href="/">Return</a> to main page.');
            });
        });

    }],

    ['/truncate', function(req, res) {

        var page_text = '';
        tyrant.search(tyrant.is('time', ''), tyrant.sort('name', 'desc')).addCallback(function(value) {
            for (item in value) {
                tyrant.out(value[item]);
            }
            res.respond('Posts truncated. <a href="/">Return</a> to main page.');
        });

    }]

];

server = nerve.create(hello);
server.serve();
