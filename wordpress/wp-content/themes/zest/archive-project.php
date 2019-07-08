<?php
$context = Timber::get_context();

$context['post'] = Timber::get_post(18);

$context['projects'] = Timber::get_posts([
	"post_type" => "project",
	"posts_per_page" => -1,
	"orderby" => "menu_order",
	"order" => "ASC"
]);

Timber::render( './templates/archive-project.twig', $context );
