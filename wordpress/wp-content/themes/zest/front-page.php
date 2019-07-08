<?php
$context = Timber::get_context();

$context['projects'] = Timber::get_posts([
	"post_type" => "project",
	"posts_per_page" => 6,
	"orderby" => "menu_order",
	"order" => "ASC"
]);

Timber::render( './templates/front-page.twig', $context );
