import { DataSeeders } from './../schema/common/data/DataSeeders';
import {MigrationInterface, QueryRunner} from "typeorm";

export class nextMigrations1601846275338 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await DataSeeders.addBusinessOperations();
        await DataSeeders.addMeasurementUnits();
        await DataSeeders.addLegalForms();
        await DataSeeders.addRoles();
        await DataSeeders.addSubRoles();
        await DataSeeders.addUser();

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await DataSeeders.addBusinessOperations();
        await DataSeeders.addMeasurementUnits();
        await DataSeeders.addLegalForms();
        await DataSeeders.addRoles();
        await DataSeeders.addSubRoles();
        await DataSeeders.addUser();
    }

}
