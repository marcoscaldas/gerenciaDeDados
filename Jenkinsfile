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


        stage('Configurar Banco de Dados') {
            steps {
                script {
                    // Acessa as variáveis de ambiente diretamente
                    def mysqlUser = env.DB_USER
                    def mysqlPassword = env.DB_PASSWORD
                    def mysqlHost = env.DB_HOST


                    // Executa o script SQL com as variáveis
                    bat "\"C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe\" -u${mysqlUser} -p${mysqlPassword} -h${mysqlHost} --batch < sql/init.sql"
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
