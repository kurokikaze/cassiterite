{{> header }}
	<div id="posts">

	<?php if (have_posts()) : ?>
		{{# posts }}

		<div class="post" id="post-<?php the_ID(); ?>">
			<h2><a href="{{link}}" rel="bookmark" title="Permanent Link to {{title}}">{{title}}</a></h2>
			<p class="date">{{date}}</p>
			<div class="entry">
				{{text}}
			</div>
			<div class="postmetadata">
				<span class="tags"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comments-no"></span>
			</div>
		</div>

		{{/ posts }}

		<div class="navigation">
			<div class="alignleft">Previous entries &laquo;</div>
			<div class="alignright">Next Entries &raquo;</div>
		</div>

	</div>

{{> footer }}