FROM openjdk:22-ea-28-jdk-bullseye

WORKDIR /backend_java

COPY . /backend_java

RUN chmod +x ./mvnw

RUN ./mvnw package spring-boot:repackage

CMD ["java", "-jar", "target/backend_java-1.0-SNAPSHOT.jar"]