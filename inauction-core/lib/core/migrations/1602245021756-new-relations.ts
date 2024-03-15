import {MigrationInterface, QueryRunner} from "typeorm";

export class newRelations1602245021756 implements MigrationInterface {
    name = 'newRelations1602245021756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Category" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Activity" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_3603ebbaf4b4db169e33bc148a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "BusinessOperation" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "name" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_ed1a51f8ede126d3139e6a6ed4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Company" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "businessRegNumber" character varying NOT NULL, "address" character varying NOT NULL, "establishmentDate" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "legalRepresentativeName" character varying NOT NULL, "legalRepresentativeSurname" character varying NOT NULL, "email" character varying NOT NULL, "websiteUrl" character varying NOT NULL, "verificationStatus" integer NOT NULL, CONSTRAINT "PK_b4993a6b3d3194767a59698298f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Role" ("id" integer NOT NULL, "roleName" character varying NOT NULL, "status" integer NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "isSubRole" boolean NOT NULL, "parentRoleId" integer, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "userType" integer NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "status" integer NOT NULL, "verified" boolean NOT NULL, "phoneNumber" character varying NOT NULL, "registrationMethod" character varying NOT NULL, "registrationType" character varying NOT NULL, "firstLogin" TIMESTAMP NOT NULL, "lastLogin" TIMESTAMP NOT NULL, "position" integer NOT NULL, "roleId" integer, "subroleId" integer, "companyId" character varying, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Expert" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "phone_number" character varying NOT NULL, "position" character varying NOT NULL, "deletedByAdmin" boolean NOT NULL, "userId" character varying, "customerId" character varying, "companyId" character varying, CONSTRAINT "PK_32dfd7e0c7021df7273a7f567e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Role" ADD CONSTRAINT "FK_1d26b7b1eceabe3026248aa58e0" FOREIGN KEY ("parentRoleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_0b8c60cc29663fa5b9fb108edd7" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_e6e7b2be14a174acdbd13fbbe5b" FOREIGN KEY ("subroleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_9ba29740add33d9319e52f58257" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "FK_d2b6f17832fd5eb97cc3701d597" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "FK_178e44f20de05c8ab869c0dbb71" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "FK_45aae6e7a34aef98527b568b96f" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "FK_45aae6e7a34aef98527b568b96f"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "FK_178e44f20de05c8ab869c0dbb71"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "FK_d2b6f17832fd5eb97cc3701d597"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_9ba29740add33d9319e52f58257"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_e6e7b2be14a174acdbd13fbbe5b"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_0b8c60cc29663fa5b9fb108edd7"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP CONSTRAINT "FK_1d26b7b1eceabe3026248aa58e0"`);
        await queryRunner.query(`DROP TABLE "Expert"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "Company"`);
        await queryRunner.query(`DROP TABLE "BusinessOperation"`);
        await queryRunner.query(`DROP TABLE "Activity"`);
        await queryRunner.query(`DROP TABLE "Category"`);
    }

}
