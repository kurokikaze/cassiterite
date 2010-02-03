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

var site ={
    title: 'Small Node.js blog'
};

var hello = [
    ["/", function(req, res) {
        var page_text = '';

        tyrant.connect();
        tyrant.addListener('connect', function() {
            tyrant.search(tyrant.is('type', 'blog'), tyrant.sort('time', 'desc')).addCallback(function(value) {

                var posts = [];
                for (item in value) {
                    var page_id = value[item];
                    tyrant.get(page_id).addCallback(function(raw_item) {

                        var item = tyrant.dict(raw_item);

                        var post_date = new Date(parseInt(item.time));
                        var page = {
                            id: page_id,
                            title:item.name,
                            link:'blog/' + page_id,
                            date: post_date.getDate() + '.' + (post_date.getMonth() + 1) + '.' + post_date.getFullYear() + ' ' + post_date.getHours() + ':' + post_date.getMinutes() + ':' + post_date.getSeconds(),
                            text: item.text,
                            tags: '',
                            num_of_comments: 0
                        };

                        posts.push(page);
                    }).wait();
                }

                var page = {'id': '0','title':'My small Node blog', 'posts': posts, 'pages':[]};

                Mu.render('page', page, {chunkSize: 10}).addCallback(function (output) {

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

        page_title = 'Add content to blog';

        var page = {
            'id': '0',
            'title': page_title,
            'text': page_text,
            'tags': '',
            'num_of_comments': 0
        };



        Mu.render('post', blog_post, {chunkSize: 10}).addCallback(function (output) {

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

    [get(/^\/blog\/(\w+)$/), function(req, res, post_id) {

        var page_text = '';
        tyrant.connect();
        tyrant.addListener('connect', function() {
            tyrant.get(post_id).addCallback(function(raw_item) {

                var item = tyrant.dict(raw_item);

                var post_date = new Date(parseInt(item.time));

                var blog_post = {
                    'id': '0',
                    'title':item.name,
                    'text': item.text,
                    'date': post_date.getDate() + '.' + (post_date.getMonth() + 1) + '.' + post_date.getFullYear() + ' ' + post_date.getHours() + ':' + post_date.getMinutes() + ':' + post_date.getSeconds(),
                    'tags': item.tags,
                    'num_of_comments': 0
                };

                Mu.render('post', blog_post, {chunkSize: 10}).addCallback(function (output) {

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

            });
        });

    }]

];

server = nerve.create(hello);
server.serve();
