FROM node:8.9.3

CMD ["/bin/bash", "-c", "/var/scripts/starter.sh"]

WORKDIR /app

COPY ./docker-config/starter.sh /var/scripts/starter.sh
RUN chmod +x /var/scripts/starter.sh