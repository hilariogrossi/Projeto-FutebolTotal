#!/bin/bash

# Defina as variáveis de configuração
DB_CONTAINER_NAME="futebol_total_mysql"
DB_USER="futebol_total"
DB_PASSWORD="futebol_total"
DB_NAME="futebol_total"
BACKUP_DIR="../"

# Gere o nome do arquivo de backup com data e hora
DATE=$(date +"%Y%m%d%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

# Use o mysqldump para criar o backup
docker exec -i $DB_CONTAINER_NAME mysqldump -u$DB_USER -p$DB_PASSWORD $DB_NAME > $BACKUP_FILE

# Verifique se o backup foi criado com sucesso
if [ $? -eq 0 ]; then
  echo "Backup do banco de dados $DB_NAME criado com sucesso em $BACKUP_FILE"
else
  echo "Erro ao criar o backup do banco de dados $DB_NAME"
fi
