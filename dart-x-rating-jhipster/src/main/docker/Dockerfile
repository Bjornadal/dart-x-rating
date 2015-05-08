FROM java:8
VOLUME /tmp
ADD dartxrating-0.0.1-SNAPSHOT.war app.war
RUN bash -c 'touch /app.war'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=prod","-jar","/app.war"]
