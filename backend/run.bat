@echo off
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.10.7-hotspot
echo [INFO] Running backend using JAVA_HOME=%JAVA_HOME%
call mvnw.cmd spring-boot:run
pause
