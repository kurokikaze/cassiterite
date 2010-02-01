<?php get_header(); ?>
	<div id="posts">

	<?php if (have_posts()) : ?>
		<?php while (have_posts()) : the_post(); ?>
		
		<div class="post" id="post-<?php the_ID(); ?>">
			<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a></h2>
			<p class="date"><?php the_time('M d') ?></p>
			<div class="entry">
				<?php the_content('read all &raquo;'); ?>
			</div>
			<div class="postmetadata">
				<span class="tags"><?php the_category(', ') ?></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="comments-no"><?php comments_popup_link('0 Comments', '1 Comment', '% Comments'); ?></span> <?php edit_post_link('Edit', '&laquo;&raquo; ', ''); ?>
			</div>
		</div>

		<?php endwhile; ?>

		<div class="navigation">
			<div class="alignleft"><?php next_posts_link('&laquo; Previous Entries') ?></div>
			<div class="alignright"><?php previous_posts_link('Next Entries &raquo;') ?></div>
		</div>

	<?php else : ?>

		<h2 class="center">Not Found</h2>
		<p class="center">Sorry, but you are looking for something that isn't here.</p>
		<?php include (TEMPLATEPATH . "/searchform.php"); ?>

	<?php endif; ?>

	</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>