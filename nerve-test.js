var nerve = require('./nerve/nerve');
var querystring = require('./querystring/querystring');
var blog = require('./cassiterite');

var sys = require('sys');

// combo library
function Combo(callback) {
  this.callback = callback;
  this.items = 0;
  this.results = [];
}
Combo.prototype = {
  add: function () {
    var self = this;
    this.items++;
    return function () {
      self.check(self.items - 1, arguments);
    };
  },
  check: function (id, arguments_in) {
    this.results[id] = arguments_in;
    this.items--;
    if (this.items == 0) {
      this.callback.call(this, this.results);
    }
  }
};

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

        blog.getPosts(0, 0, function(posts) {

            var page = {'id': '0','title':'My small Node blog', 'posts': posts, 'pages':[]};
            blog.render('page', res, page);

        });

    }],

    [get("/write"), function(req, res) {

        var page_text = '<h1>My small node blog</h1>';
        page_text += '<h2>Write new blog entry</h2>';
        page_text += '<form method="POST" action="/save">';
        page_text += '<label for="title">Post title</label><br/><input type="text" name="title" /><br/>';
        page_text += '<label for="body">Post body</label><br/><textarea cols="80" rows="24" name="body" >Enter post body</textarea>';
        page_text += '<input type="submit" value="Save post" />';
        page_text += '</form>';

        blog.renderPage('Add content to blog', page_text, res);
    }],

    [post('/save'), function(req, res) {

        // Save post to Tyrant
        getPostParams(req, function(data) {
            var post = querystring.parse(data);
            post.time = (new Date()).getTime();
            blog.savePost(post).addCallback(function(){

                blog.renderPage('Post saved succesfully', '<p>Your post was saved succesfully, you can <a href="/add">add another</a> or <a href="/">return to main page</a>.</p>', res);

            });
        });

    }],

    [get(/^\/blog\/(\w+)$/), function(req, res, post_id) {

        blog.getPost(post_id).addCallback(function(post) {
            blog.render('post', res, post);
        });

    }]

];

nerve.create(hello).listen(8000);