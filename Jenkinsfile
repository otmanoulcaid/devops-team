pipeline {
    agent any
    environment {
        CONTAINER_NAME = 'demo'
        IMAGE_NAME = 'demo'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/otmanoulcaid/devops-team.git'
            }
        }

        stage('test') {
            steps {
                echo "test complete"
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME ./config'
            }
        }

        stage('clean') {
            steps {
                sh './clean.sh $CONTAINER_NAME'
            }
        }

        stage('deploy docker container') {
            steps {
                sh 'docker run --name=$CONTAINER_NAME -d -p 8008:80 $IMAGE_NAME'
            }
        }
    }

    post {
        always {
            echo "Pipeline complete."
        }
    }
}
