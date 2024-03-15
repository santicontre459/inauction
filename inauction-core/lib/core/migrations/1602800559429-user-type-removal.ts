import {MigrationInterface, QueryRunner} from "typeorm";

export class userTypeRemoval1602800559429 implements MigrationInterface {
    name = 'userTypeRemoval1602800559429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Category" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Activity" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_3603ebbaf4b4db169e33bc148a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "BusinessOperation" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "name" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_ed1a51f8ede126d3139e6a6ed4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Company" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "businessRegNumber" character varying NOT NULL, "address" character varying NOT NULL, "establishmentDate" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "legalRepresentativeName" character varying NOT NULL, "legalRepresentativeSurname" character varying NOT NULL, "email" character varying NOT NULL, "websiteUrl" character varying NOT NULL, "verificationStatus" integer NOT NULL, CONSTRAINT "PK_b4993a6b3d3194767a59698298f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "LegalForm" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_29ddcf6e66525ebe5507dbd63ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CompanyInformation" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "ownership" character varying NOT NULL, "phone" character varying NOT NULL, "employeeTotal" integer NOT NULL, "annualTurnover" character varying NOT NULL, "legalFormId" character varying, CONSTRAINT "PK_66bb02343b9cdb0a0729de4138d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Currency" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_f0c829663a81fd9fc08536b664d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "EventCategory" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" integer NOT NULL, CONSTRAINT "PK_a1b1f67d91140e96905b870db5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Role" ("id" integer NOT NULL, "roleName" character varying NOT NULL, "status" integer NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "isSubRole" boolean NOT NULL, "parentRoleId" integer, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "userType" integer NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" integer NOT NULL, "verified" boolean NOT NULL, "phoneNumber" character varying NOT NULL, "registrationMethod" character varying NOT NULL, "registrationType" character varying NOT NULL, "firstLogin" TIMESTAMP NOT NULL, "lastLogin" TIMESTAMP NOT NULL, "position" integer NOT NULL, "roleId" integer, "subroleId" integer, "companyId" character varying, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Event" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "title" character varying NOT NULL, "reference_number" character varying NOT NULL, "description" character varying NOT NULL, "budget" integer NOT NULL, "nr_of_experts" integer NOT NULL, "has_questionnaire" integer NOT NULL, "is_rfq" integer NOT NULL, "is_oa" integer NOT NULL, "progress_status" character varying NOT NULL, "seal_result_type" integer NOT NULL, "visibility" character varying NOT NULL, "accessible_list_id" character varying NOT NULL, "deletedByAdmin" boolean NOT NULL, "currencyId" character varying, "userId" character varying, "eventCategoryId" character varying, "companyId" character varying, "activityId" character varying, CONSTRAINT "PK_efc6f7ffffa26a4d4fe5f383a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Expert" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "phone_number" character varying NOT NULL, "position" character varying NOT NULL, "deletedByAdmin" boolean NOT NULL, "userId" character varying, "customerId" character varying, "companyId" character varying, CONSTRAINT "PK_32dfd7e0c7021df7273a7f567e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "InviteBidder" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "modifiedAt" TIMESTAMP NOT NULL, "modifiedBy" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "inviter_role" character varying NOT NULL, "content" character varying NOT NULL, "company_name" character varying NOT NULL, "company_registration_number" character varying NOT NULL, "email" character varying NOT NULL, "type" character varying NOT NULL, "scheduled_date" TIMESTAMP NOT NULL, "scheduled_timezone" TIMESTAMP NOT NULL, "responded_date" TIMESTAMP NOT NULL, "responded_status" TIMESTAMP NOT NULL, "status" integer NOT NULL, "userId" character varying, "companyId" character varying, CONSTRAINT "PK_13689e631e44c0140d91e7fbe33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "CompanyInformation" ADD CONSTRAINT "FK_ca474bbd70c16d6fba638aff5a7" FOREIGN KEY ("legalFormId") REFERENCES "LegalForm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Role" ADD CONSTRAINT "FK_1d26b7b1eceabe3026248aa58e0" FOREIGN KEY ("parentRoleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_0b8c60cc29663fa5b9fb108edd7" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_e6e7b2be14a174acdbd13fbbe5b" FOREIGN KEY ("subroleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_9ba29740add33d9319e52f58257" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_bd70d47eff57a0ef103e4682cf6" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_2af56b6161191216bf36b33f6a7" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_631f5be4b7cb0f703e39c4774e8" FOREIGN KEY ("eventCategoryId") REFERENCES "EventCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_5896931cdfe15cfbf89e04cce3d" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_21e7229645cda4f55b92719a844" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "FK_d2b6f17832fd5eb97cc3701d597" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "FK_178e44f20de05c8ab869c0dbb71" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Expert" ADD CONSTRAINT "FK_45aae6e7a34aef98527b568b96f" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "InviteBidder" ADD CONSTRAINT "FK_8d5022f683631b00d64572c062f" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "InviteBidder" ADD CONSTRAINT "FK_a0c9060b2e295c736af680f6371" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InviteBidder" DROP CONSTRAINT "FK_a0c9060b2e295c736af680f6371"`);
        await queryRunner.query(`ALTER TABLE "InviteBidder" DROP CONSTRAINT "FK_8d5022f683631b00d64572c062f"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "FK_45aae6e7a34aef98527b568b96f"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "FK_178e44f20de05c8ab869c0dbb71"`);
        await queryRunner.query(`ALTER TABLE "Expert" DROP CONSTRAINT "FK_d2b6f17832fd5eb97cc3701d597"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_21e7229645cda4f55b92719a844"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_5896931cdfe15cfbf89e04cce3d"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_631f5be4b7cb0f703e39c4774e8"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_2af56b6161191216bf36b33f6a7"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_bd70d47eff57a0ef103e4682cf6"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_9ba29740add33d9319e52f58257"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_e6e7b2be14a174acdbd13fbbe5b"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_0b8c60cc29663fa5b9fb108edd7"`);
        await queryRunner.query(`ALTER TABLE "Role" DROP CONSTRAINT "FK_1d26b7b1eceabe3026248aa58e0"`);
        await queryRunner.query(`ALTER TABLE "CompanyInformation" DROP CONSTRAINT "FK_ca474bbd70c16d6fba638aff5a7"`);
        await queryRunner.query(`DROP TABLE "InviteBidder"`);
        await queryRunner.query(`DROP TABLE "Expert"`);
        await queryRunner.query(`DROP TABLE "Event"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "EventCategory"`);
        await queryRunner.query(`DROP TABLE "Currency"`);
        await queryRunner.query(`DROP TABLE "CompanyInformation"`);
        await queryRunner.query(`DROP TABLE "LegalForm"`);
        await queryRunner.query(`DROP TABLE "Company"`);
        await queryRunner.query(`DROP TABLE "BusinessOperation"`);
        await queryRunner.query(`DROP TABLE "Activity"`);
        await queryRunner.query(`DROP TABLE "Category"`);
    }

}
