<?php get_header(); ?>

	<div id="posts">

	<?php if (have_posts()) : ?>

		<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>

		<?php /* If this is a category archive */ if (is_category()) { ?>
		<h1 class="caption">Posts in &#8216;<?php echo single_cat_title(); ?>&#8217;</h1>

		<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
		<h1 class="caption">Posts from <?php the_time('F jS, Y'); ?></h1>

		<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
		<h1 class="caption">Posts from <?php the_time('F, Y'); ?></h1>

		<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
		<h1 class="caption">Posts from <?php the_time('Y'); ?></h1>

		<?php /* If this is an author archive */ } elseif (is_author()) { ?>
		<h1 class="caption">Author Archive</h1>

		<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
		<h1 class="caption">Blog Archives</h1>

		<?php } ?>


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
		<?php include (TEMPLATEPATH . '/searchform.php'); ?>

	<?php endif; ?>

	</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>