NAME=nest

# nest
nest-gm:
	 nest generate module ${NAME}

nest-gc:
	 nest generate controller ${NAME} 

nest-gs:
	 nest generate service ${NAME} 

nest-gmi:
	 nest generate middleware ${NAME} 

nest-gt: nest-gm nest-gc nest-gs


# prisma
prisma-status:
	npx prisma status
prisma-pull:
	npx prisma db pull
prisma-generate:
	npx prisma generate
prisma-push:
	npx prisma db push
prisma-migrate:
	npx prisma migrate dev --name ${PRISMA_MIGRATION_NAME}
prisma-diff:
	npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --script
prisma-manually-migrate:
	npx prisma migrate deploy