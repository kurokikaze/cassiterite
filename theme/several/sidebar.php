			<div id="sidebar">
				<ul>
					<?php 	/* Widgetized sidebar, if you have the plugin installed. */
							if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : ?>

				<?php wp_list_categories('show_count=0&title_li=<h2>Categories</h2>'); ?>

				<li><h2>Archives</h2>
					<ul>
					<?php wp_get_archives('type=monthly'); ?>
					</ul>
				</li>

				<?php /* If this is the frontpage */ if ( is_home() || is_page() ) { ?>
					<?php wp_list_bookmarks(); ?>

				<?php } ?>

					<?php endif; ?>
				</ul>
			</div>
			<div class="clearing">&nbsp;</div>
		</div>
	</div>