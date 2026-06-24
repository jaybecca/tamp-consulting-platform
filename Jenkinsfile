pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/jaybecca/tamp-consulting-platform.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t tamp-consulting .'
            }
        }

        stage('Deploy Website') {
            steps {
                sh '''
                docker stop tamp-site || true
                docker rm tamp-site || true

                docker run -d \
                  -p 8082:80 \
                  --name tamp-site \
                  tamp-consulting
                '''
            }
        }
    }
}