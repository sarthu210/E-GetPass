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
                git url: 'file:///C:/Users/91902/Dropbox/PC/Downloads/devops/backend', branch: 'main' // Adjust the branch name if necessary
            }
        }

        stage('Install Dependencies') {
            steps {
                // Navigate to the backend directory
                dir('backend') {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run your tests (if you have any)
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                // Build your application (if applicable)
                dir('backend') {
                    sh 'npm run build' // Adjust this command according to your build script
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy your application (this will depend on your deployment strategy)
                echo 'Deploying application...'
                // Example: you could use scp or any other deployment command
                // sh 'scp -r backend user@server:/path/to/deploy'
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
