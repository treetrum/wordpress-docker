start:
	docker-compose up -d
	rm -rf wordpress/wp-content/plugins/hello.php wordpress/wp-content/plugins/akismet
	rm -rf wordpress/wp-content/themes/twenty*

stop:
	docker-compose down