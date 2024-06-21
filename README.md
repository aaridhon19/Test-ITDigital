# Test-ITDigital 

## Before 

If there is no Docker application on your device, you can download it on this site https://www.docker.com/get-started

## Clone Repository 

Clone Repository to your device 

```bash
    git clone https://github.com/aaridhon19/Test-ITDigital.git
    cd Test-ITDigital
```

## Installation

Install with npm

```bash
    npm install
```

## Docker 

Build docker

```bash
    docker build -t test-it-digital .
```

Running docker

```bash
   docker run -p 4000:4000 -d test-it-digital
```
