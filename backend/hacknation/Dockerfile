ARG JAVA_VERSION=21
ARG RUN_BASE=eclipse-temurin:${JAVA_VERSION}-alpine
ARG BUILD_BASE=eclipse-temurin:${JAVA_VERSION}-jdk-jammy
ARG UID=1001
ARG ARTIFACT=app.jar

FROM ${BUILD_BASE} AS builder
WORKDIR /opt/app
COPY .mvn/ .mvn
COPY --chmod=0755 mvnw mvnw
COPY pom.xml pom.xml

RUN --mount=type=cache,target=/root/.m2 ./mvnw dependency:go-offline -DskipTests

COPY ./src ./src
RUN ./mvnw package -DskipTests -T 1C

FROM ${RUN_BASE} AS runner
ARG ARTIFACT
ARG UID

WORKDIR /opt/app

COPY --from=builder /opt/app/target/*.jar ${ARTIFACT}

RUN adduser -D -H -s '/sbin/nologin' -u ${UID} java
RUN chown -R java:java /opt/app

USER java

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar" ]