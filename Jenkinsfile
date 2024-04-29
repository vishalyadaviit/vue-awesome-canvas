pipeline {
    agent any
    stages {
        stage("Build 🛠️") {
            steps {
                echo "========executing Build VueAwesomeCanvas========"
                sh 'npm install' // Install dependencies
                sh 'npm run build' // Build the project
            }
            post {
                always {
                    echo "========Build done========"
                }
                success {
                    echo "========Build executed successfully========"
                }
                failure {
                    echo "========Build execution failed========"
                }
            }
        }
    }
    post {
        always {
            // deleteDir()
            echo "========always========"
        }
        success {
            echo "========pipeline executed successfully ========"
        }
        failure {
            echo "========pipeline execution failed========"
        }
    }
}