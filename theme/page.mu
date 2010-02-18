<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head profile="http://gmpg.org/xfn/11">
<title>My little Node blog</title>
<meta name="author" content="Stelian Firez" />
<meta name="keywords" content="" />
<meta name="description" content="This is the blog about Node.js" />

<link rel="stylesheet" href="/files/style.css" type="text/css" media="screen" />
<link rel="alternate" type="application/rss+xml" title="Node blog RSS Feed" href="/rss" />
</head>
<body>
    <div id="header">
        <div id="header-wrap">
            <h1 id="logo">
                <a href="/" title="My little Node blog">My little Node blog</a>
            </h1>
            <h2 id="tagline">Tagline</h2>
            <ul id="nav">
                <li><a href="/" title="My little Node blog">Home</a></li>
                {{#pages}}
                <li><a href="/page/{{id}}" title="{{title}}">{{title}}</a></li>
                {{/pages}}
            </ul>
        </div>
    </div>
    <div id="splash">
        <div id="splash-wrap">
            <div id="recent-posts-x">
                <a href="#">&nbsp;</a>
            </div>
            <hr />
            <div id="recent-comments">
            </div>
            <div id="extra">
                <h2>Search</h2>
                <div id="search">

                </div>
            </div>
            <div class="clearing">&nbsp;</div>
        </div>
    </div>
    <div id="content">
        <div id="content-wrap">
        	<div id="posts">

		{{#posts}}

		<div class="post" id="post-{{id}}">
			<h2><a href="{{link}}" rel="bookmark" title="Permanent Link to {{title}}">{{title}}</a></h2>
			<p class="date">{{date}}</p>
			<div class="entry">
				{{{text}}}
			</div>
			<div class="postmetadata">
				<span class="tags">{{tags}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comments-no">{{num-of-comments}}</span>
			</div>
		</div>

		{{/posts}}

		<div class="navigation">
			<div class="alignleft">Previous entries &laquo;</div>
			<div class="alignright">Next Entries &raquo;</div>
		</div>

	</div>

    <div id="footer">
        <div id="footer-wrap">
            <p>Design by <a href="http://www.net-tec.biz">NET-TEC Internetmarketing</a> | <a href="http://www.das-artikelverzeichnis.de">Artikel schreiben</a> | <a href="http://www.kredit.biz">Kreditvergleich</a> | <a href="http://www.oekoadressen.de ">Branchenbuch</a></p>
        </div>
    </div>
    <div id="fix-recent-posts">
        <div id="wrap">
        </div>
    </div>

</body>
</html>
