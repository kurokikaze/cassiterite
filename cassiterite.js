var events = require('events');
var Mu = require('./mu/mu');
var tyrant = require('./tyrant/tyrant');
var showdown = require('./showdown');

Mu.templateRoot = './theme';

var cassiterite = {};

var converter = new showdown.converter();

// Closure
(function(){
    cassiterite = {
        getPosts: function(number, offset, callback) {

            var promise = new events.Promise();
            tyrant.connect();
            tyrant.addListener('error', function(e) {
                sys.puts('Error: ' + JSON.stringify(e));
            });

            tyrant.addListener('connect', function() {
                tyrant.search(tyrant.is('type', 'blog'), tyrant.sort('time', 'desc')).addCallback(function(value) {
                    tyrant.getlist(value).addCallback(function(added_posts) {

                        var posts_processed = [];
                        var items = tyrant.dict(added_posts);

                        for (var raw_item in items) {
                            var item_mock = items[raw_item].split('\u0000');
                            var item = tyrant.dict(item_mock);

                            var post_date = new Date(parseInt(item.time));

                            posts_processed.push({
                                id: raw_item,
                                title:item.name,
                                link:'blog/' + raw_item,
                                date: post_date.getDate() + '.' + (post_date.getMonth() + 1) + '.' + post_date.getFullYear() + ' ' + post_date.getHours() + ':' + post_date.getMinutes() + ':' + post_date.getSeconds(),
                                text: item.text,
                                tags: '',
                                num_of_comments: 0
                            });
                        }

                        promise.emitSuccess(posts_processed);
                    });

                    // res.respond(page_text);
                }).addErrback(function(e){
                    promise.emitError(e);
                });
            });

            if (callback) {
                promise.addCallback(callback);
            }
            return promise;
        },

        render: function(type, response, page, callback) {
            var promise = new events.Promise();
            Mu.render(type, page, {chunkSize: 10}).addCallback(function (output) {

                var buffer = '';

                output
                  .addListener('data', function (c) {
                    buffer += c;
                  })
                  .addListener('eof', function () {
                    response.respond(buffer);
                    promise.emitSuccess(true);
                  });
            }).addErrback(function (e) {
                response.respond('Render Oops:' + JSON.stringify(e));
                promise.emitError(e);
            });

            if (callback) {
                promise.addCallback(callback);
            }
            return promise;
        },

        getPost: function(id, callback) {
            var promise = new events.Promise();
            tyrant.connect();
            tyrant.addListener('connect', function() {
                tyrant.get(id).addCallback(function(raw_item) {

                    var item = tyrant.dict(raw_item);

                    var post_date = new Date(parseInt(item.time));

                    var blog_post = {
                        'id': '0',
                        'title':item.name,
                        'text': converter.makeHtml(item.text),
                        'date': post_date.getDate() + '.' + (post_date.getMonth() + 1) + '.' + post_date.getFullYear() + ' ' + post_date.getHours() + ':' + post_date.getMinutes() + ':' + post_date.getSeconds(),
                        'tags': item.tags,
                        'num_of_comments': 0
                    };

                    promise.emitSuccess(blog_post);

                }).addErrback(function(e) {
                    promise.emitError(e);
                });
            });

            if (callback) {
                promise.addCallback(callback);
            }

            return promise;
        },

        savePost: function(post) {
            var promise = new events.Promise();

            tyrant.connect();
            tyrant.addListener('connect', function() {
                tyrant.put('blogentry' + post.time, 'type', 'blog', 'name', post.title, 'text', post.body, 'time', post.time.toString());
                promise.emitSuccess();
            });
            return promise;
        },

        renderPage: function(title, text, response) {
            var page = {
                'id': '0',
                'title': title,
                'text': text,
                'tags': '',
                'num_of_comments': 0
            };

            this.render('post', response, page);
        }

    };
})();

process.mixin(exports, cassiterite);