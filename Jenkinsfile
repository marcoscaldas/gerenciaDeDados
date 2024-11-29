pipeline {
    agent any

    environment {
        MYSQL_PATH = "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe"
        MYSQL_USER = "${env.DB_USER}"
        MYSQL_PASSWORD = "${env.DB_PASSWORD}"
        MYSQL_HOST = "${env.DB_HOST}"
        DATABASE_NAME = 'testdb'
        SQL_INIT_SCRIPT = 'sql/init.sql'  // Caminho do script SQL
    }

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
                    // Verifica se o banco de dados existe
                    def dbExists = bat(script: """
                        "${MYSQL_PATH}" -u${MYSQL_USER} -p${MYSQL_PASSWORD} -h${MYSQL_HOST} -e "SHOW DATABASES LIKE '${DATABASE_NAME}'" --batch --silent
                    """, returnStdout: true).trim()

                    // Se o banco não existir, cria o banco e executa o script SQL
                    if (dbExists == '') {
                        echo "Banco de dados não encontrado. Criando banco e executando script SQL..."
                        bat """
                            "${MYSQL_PATH}" -u${MYSQL_USER} -p${MYSQL_PASSWORD} -h${MYSQL_HOST} -e "CREATE DATABASE ${DATABASE_NAME};" --batch
                            "${MYSQL_PATH}" -u${MYSQL_USER} -p${MYSQL_PASSWORD} -h${MYSQL_HOST} ${DATABASE_NAME} < ${SQL_INIT_SCRIPT}
                        """
                    } else {
                        echo "Banco de dados '${DATABASE_NAME}' já existe. Pulando criação e seguindo para os testes."
                    }
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
