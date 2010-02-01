<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head profile="http://gmpg.org/xfn/11">
<title>{{title}}</title>
<meta name="author" content="Stelian Firez" />
<meta name="keywords" content="season7, WordPress, theme, sold, sitepoint" />
<meta name="description" content="This is the blog of Stelian Firez, a place where you can find lots of news, downloads and tutorials in web design" />

<link rel="stylesheet" href="/files/css/style.css" type="text/css" media="screen" />
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
				<li><a href="<?php echo get_option('home'); ?>/" title="My little Node blog">Home</a></li>
                {{# pages }}
                <li><a href="/entry/{{page}}" title="My little Node blog">{{page}}</a></li>
				{{/ pages }}
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