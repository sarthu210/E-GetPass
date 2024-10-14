pipeline {
    agent any

    environment {
        // Define any environment variables here
        NODE_HOME = '/usr/local/bin/node' // Change this to your Node.js path
        PATH = "${env.NODE_HOME}:${env.PATH}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository
                git url: 'https://github.com/sarthu210/E-GetPass.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Navigate to the backend directory
                dir('Backend') {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run your tests (if you have any)
                dir('Backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                // Build your application (if applicable)
                dir('Backend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy your application (this will depend on your deployment strategy)
                echo 'Deploying application...'
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
