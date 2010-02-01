<?php get_header(); ?>
	<div id="posts">

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

		<div class="post" id="post-<?php the_ID(); ?>">
			<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a></h2>
			<p class="date"><?php the_time('M d') ?></p>
			<div class="entry">
				<?php the_content('read all &raquo;'); ?>
			</div>
			<div class="postmetadata">
				<span class="tags"><?php the_category(', ') ?></span> <?php edit_post_link('Edit', '&laquo;&raquo; ', ''); ?>
			</div>
		</div>

			<?php comments_template(); ?>

			<?php endwhile; else: ?>

				<p>Sorry, no posts matched your criteria.</p>

			<?php endif; ?>

			</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
