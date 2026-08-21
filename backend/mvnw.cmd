@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script, version 3.2.0
@REM ----------------------------------------------------------------------------

@if "%MAVEN_BATCH_ECHO%" == "on"  echo %MAVEN_BATCH_ECHO%
@if "%MAVEN_BATCH_ECHO%" == "" @echo off

set ERROR_CODE=0

@REM set %~dp0 to MAVEN_BASEDIR
set MAVEN_BASEDIR=%~dp0
if not "%MAVEN_BASEDIR%"=="" set MAVEN_BASEDIR=%MAVEN_BASEDIR:~0,-1%

@REM Find maven.config file
set MAVEN_CONFIG_FILE="%MAVEN_BASEDIR%\.mvn\maven.config"
if exist %MAVEN_CONFIG_FILE% (
  set /p MAVEN_CONFIG=<%MAVEN_CONFIG_FILE%
) else (
  set MAVEN_CONFIG=
)

@REM Execute mvn
if exist "%MAVEN_BASEDIR%\.mvn\wrapper\maven-wrapper.jar" (
    java -jar "%MAVEN_BASEDIR%\.mvn\wrapper\maven-wrapper.jar" %*
) else (
    echo Maven wrapper jar missing. Please build using system mvn first.
)

if %ERRORLEVEL% NEQ 0 set ERROR_CODE=%ERRORLEVEL%
cmd /C exit /B %ERROR_CODE%
