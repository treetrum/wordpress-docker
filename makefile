start:
	docker-compose up -d
	sleep 5
	sudo rm -rf wordpress/wp-content/plugins/hello.php wordpress/wp-content/plugins/akismet
	sudo rm -rf wordpress/wp-content/themes/twenty*

stop:
	docker-compose down