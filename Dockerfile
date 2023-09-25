FROM registry.gitlab.tcjteam.tech/tcj/wealth/docker-wl-apache:v0.9.7

ADD --chown=default:root dist/apps/ /var/www/html/wealth/app/
