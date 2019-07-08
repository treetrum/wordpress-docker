<?php
$context = Timber::get_context();

$context['post'] = Timber::get_post();

Timber::render( './templates/page-our-story.twig', $context );
