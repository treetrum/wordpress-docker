start:
	docker-compose up -d
	rm -rf wordpress/wp-content/plugins/hello.php wp-content/plugins/akismet
	rm -rf wordpress/wp-content/themes/twenty*
	cd wordpress; composer install

stop:
	docker-compose down