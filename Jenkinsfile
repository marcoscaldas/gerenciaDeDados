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

        stage('Verificar e Criar Banco de Dados') {
            steps {
                script {
                    // Verifica se o banco de dados existe
                    def dbExists = bat(script: """
                        "${MYSQL_PATH}" -u${MYSQL_USER} -p${MYSQL_PASSWORD} -h${MYSQL_HOST} -e "SHOW DATABASES LIKE '${DATABASE_NAME}'" --batch --silent
                    """, returnStdout: true).trim()

                    if (dbExists == '') {
                        echo "Banco de dados não encontrado. Criando banco e executando script SQL..."
                        // Cria o banco de dados e executa o script SQL
                        def createDbResult = bat(script: """
                            "${MYSQL_PATH}" -u${MYSQL_USER} -p${MYSQL_PASSWORD} -h${MYSQL_HOST} -e "CREATE DATABASE ${DATABASE_NAME};" --batch
                        """, returnStatus: true)
                        
                        if (createDbResult != 0) {
                            error "Falha ao criar o banco de dados ${DATABASE_NAME}."
                        }
                        
                        // Executa o script SQL para inicializar o banco de dados
                        def execSqlResult = bat(script: """
                            "${MYSQL_PATH}" -u${MYSQL_USER} -p${MYSQL_PASSWORD} -h${MYSQL_HOST} ${DATABASE_NAME} < ${SQL_INIT_SCRIPT}
                        """, returnStatus: true)
                        
                        if (execSqlResult != 0) {
                            error "Erro ao executar o script SQL para o banco de dados ${DATABASE_NAME}."
                        }
                    } else {
                        echo "Banco de dados '${DATABASE_NAME}' já existe. Pulando criação e seguindo para os testes."
                    }
                }
            }
        }

        stage('Executar Testes') {
            steps {
                script {
                    // Aumentando o timeout dos testes para lidar com possíveis atrasos
                    bat 'npx mocha test/usuarios.test.js --exit --timeout 10000'
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
