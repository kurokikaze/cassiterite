	<div id="footer">
		<div id="footer-wrap">
			<p>Design by <a href="http://www.net-tec.biz">NET-TEC Internetmarketing</a> | <a href="http://www.das-artikelverzeichnis.de">Artikel schreiben</a> | <a href="http://www.kredit.biz">Kreditvergleich</a> | <a href="http://www.oekoadressen.de ">Branchenbuch</a></p>
		</div>
	</div>
	<?php wp_footer(); ?>
	<div id="fix-recent-posts">
		<div id="wrap">
		<div id="recent-posts">
			<h2>Recent Posts</h2>
				<?php query_posts('showposts=3'); ?>
			<ul>
				<?php while (have_posts()) : the_post(); ?>
				<li>
					<a href="<?php the_permalink() ?>" rel="bookmark" title="<?php _e('Permanent link to'); ?> <?php the_title(); ?>"><?php the_title(); ?><br /><span><?php the_time('M d') ?></span></a>
				</li>
				<?php endwhile;?>
			</ul>
		</div>
		</div>
	</div>



</body>
</html>
