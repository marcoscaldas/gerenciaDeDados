pipeline {
    agent any

    stages {
        stage('Instalar Dependências') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }

        stage('Executar Testes') {
            steps {
                script {
                    bat 'npx mocha test/usuarios.test.js --exit'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
        success {
            echo 'Todos os testes passaram com sucesso!'
        }
        failure {
            echo 'Alguns testes falharam.'
        }
    }
}
