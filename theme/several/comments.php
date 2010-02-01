<?php // Do not delete these lines
	if ('comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
		die ('Please do not load this page directly. Thanks!');

	if (!empty($post->post_password)) { // if there's a password
		if ($_COOKIE['wp-postpass_' . COOKIEHASH] != $post->post_password) {  // and it doesn't match the cookie
			?>

			<p class="nocomments">This post is password protected. Enter the password to view comments.</p>

			<?php
			return;
		}
	}

	/* This variable is for alternating comment background */
	$oddcomment = 'class="alt" ';
?>

<!-- You can start editing here. -->

<?php if ($comments) : ?>
	<div id="comments">
		<h2><?php comments_number('No Comments', '<span>1</span> Comment', '% Comments' );?></h2>
		<p class="add-comment"><a href="#commentform" title="Add your comment">Add your comment</a></p>
		<ol id="commentlist">

		<?php foreach ($comments as $comment) : ?>

			<li class="<?php echo $first; ?>" id="comment-<?php comment_ID() ?>">
				<div class="author">
					<?php comment_author_link() ?><br /><span><?php comment_date('M d \a\t H:i') ?></span>
				</div>
				<div class="comment approved<?php if ($comment->comment_approved == '0') : ?>_0<?php endif; ?>">
					<?php comment_text() ?><?php if ($comment->comment_approved == '0') : ?><span>Your comment is awaiting moderation.</span><?php endif; ?>
				</div>
			</li>

			<?php
				/* Changes every other comment to a different class */
				$oddcomment = ( empty( $oddcomment ) ) ? 'class="alt" ' : '';
				if(get_comment_ID() != '') {
					$first = 'border-t';
				}
				else{
					$first = 'noup';
				}
			?>

			<?php endforeach; /* end for each comment */ ?>

		</ol>
	</div>

 <?php else : // this is displayed if there are no comments so far ?>

	<?php if ('open' == $post->comment_status) : ?>
		<!-- If comments are open, but there are no comments. -->

	 <?php else : // comments are closed ?>
		<!-- If comments are closed. -->
		<p class="nocomments">Comments are closed.</p>

	<?php endif; ?>

<?php endif; ?>


<?php if ('open' == $post->comment_status) : ?>
	<div id="post-comments">
		<h2>Post a comment</h2>
		<div id="reply">

			<?php if ( get_option('comment_registration') && !$user_ID ) : ?>
			<p class="comment-field">You must be <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?redirect_to=<?php the_permalink(); ?>">logged in</a> to post a comment.</p>
			<?php else : ?>
			<form action="<?php echo get_option('siteurl'); ?>/wp-comments-post.php" method="post" id="commentform">

				<?php if ( $user_ID ) : ?>

				<div class="comment-field">Logged in as <a href="<?php echo get_option('siteurl'); ?>/wp-admin/profile.php"><?php echo $user_identity; ?></a>. <a href="<?php echo get_option('siteurl'); ?>/wp-login.php?action=logout" title="Log out of this account">Logout &raquo;</a></div>

				<?php else : ?>

				<div class="comment-field"><label for="author">Name <?php if ($req) echo "(required)"; ?></label><input type="text" name="author" id="author" value="<?php echo $comment_author; ?>" size="22" tabindex="1" class="input-text" /></div>

				<div class="comment-field"><label for="email">Mail (not shown) <?php if ($req) echo "(required)"; ?></label><input type="text" name="email" id="email" value="<?php echo $comment_author_email; ?>" size="22" class="input-text" tabindex="2" /></div>

				<div class="comment-field"><label for="url">Website</label><input type="text" name="url" id="url" value="<?php echo $comment_author_url; ?>" size="22" class="input-text" tabindex="3" /></div>

				<?php endif; ?>

				<!--<p><small><strong>XHTML:</strong> You can use these tags: <?php echo allowed_tags(); ?></small></p>-->

				<div class="comment-field"><label for="comment">Comment</label><textarea name="comment" id="comment" cols="60" rows="10" tabindex="4"></textarea></div>

				<div class="comment-field">
					<input name="submit" type="submit" id="submit" tabindex="5" value="Submit" class="input-button" />
					<input type="hidden" name="comment_post_ID" value="<?php echo $id; ?>" />
				</div>
			
				<?php do_action('comment_form', $post->ID); ?>

			</form>

<?php endif; // If registration required and not logged in ?>
		</div>
	</div>
<?php endif; // if you delete this the sky will fall on your head ?>
