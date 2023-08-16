FROM openjdk:11
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} mung.jar
ENTRYPOINT ["java","-jar","/mung.jar"]