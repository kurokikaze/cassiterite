<?php
/*
Plugin Name: Simple Recent Comments
Plugin URI: http://www.g-loaded.eu/2006/01/15/simple-recent-comments-wordpress-plugin/
Description: Shows a list of recent comments.
Version: 0.1.2
Author: GNot
Author URI: http://www.g-loaded.eu/
*/

/*
License: GPL
Compatibility: All

Installation:
Place the simple_recent_comments.php file in your /wp-content/plugins/ directory
and activate through the administration panel.

Usage:
This plugin returns an unordered list of the most recent comments.
It provides a template function you can use:
	src_simple_recent_comments(arg1, arg2, 'arg3', 'arg4')
Arguments explanation:
	arg1 (numeric): The number of comments to return. Default: 7
	arg2 (numeric): The comment excerpt length. Default: 60
	arg3 (alphanumeric): The HTML code to prepend to the list. Default: '<li><h2>Recent Comments</h2>'
	arg4 (alphanumeric): The HTML code to append to the list. Default: '</li>'

Of course it can be used without arguments. In this case the defaults will be used.
The default usage of the template function is to place it in the sidebar.
<?php src_simple_recent_comments(); ?>

I would recommend to use the following way of placing the function in your template:
	<?php if (function_exists('src_simple_recent_comments')) { src_simple_recent_comments(); } ?>
This way, even if you de-activate the plugin in your administration panel, but you
do not remove it from your templates, it would not produce any errors. The plugin simply will not
function at all and will show nothing.
*/

/*  Copyright (C) George Notaras (http://www.g-loaded.eu/)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/


/* Changelog
* Wed Oct 04 2006 - v0.1.2
- Plugin information update
* Sun Apr 30 2006 - v0.1.1
- Now works with non standard wordpress table names.
* Sat Jan 14 2006 - v0.1
- Initial release
*/


function src_simple_recent_comments($src_count=7, $src_length=60, $pre_HTML='<li><h2>Recent Comments</h2>', $post_HTML='</li>') {
	global $wpdb;
	
	$sql = "SELECT DISTINCT ID, post_title, post_password, comment_ID, comment_post_ID, comment_author, comment_date_gmt, comment_approved, comment_type, 
			SUBSTRING(comment_content,1,$src_length) AS com_excerpt 
		FROM $wpdb->comments 
		LEFT OUTER JOIN $wpdb->posts ON ($wpdb->comments.comment_post_ID = $wpdb->posts.ID) 
		WHERE comment_approved = '1' AND comment_type = '' AND post_password = '' 
		ORDER BY comment_date_gmt DESC 
		LIMIT $src_count";
	$comments = $wpdb->get_results($sql);

	$output = $pre_HTML;
	$output .= "\n<ul>";
	foreach ($comments as $comment) {
		$output .= "\n\t<li><a href=\"" . get_permalink($comment->ID) . "#comment-" . $comment->comment_ID  . "\" title=\"on " . $comment->post_title . "\">" .strip_tags($comment->com_excerpt) . "..." . "<br /><span>" . $comment->comment_author . "</span>" . "</a></li>";
	}
	$output .= "\n</ul>";
	$output .= $post_HTML;
	
	echo $output;

}

?>
