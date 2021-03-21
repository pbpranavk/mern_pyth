import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDesc1616330906319 implements MigrationInterface {
    name = 'AddDesc1616330906319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todo` ADD `description` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todo` DROP COLUMN `description`");
    }

}
