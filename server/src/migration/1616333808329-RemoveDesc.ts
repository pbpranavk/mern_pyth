import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveDesc1616333808329 implements MigrationInterface {
    name = 'RemoveDesc1616333808329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todo` DROP COLUMN `description`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todo` ADD `description` varchar(255) NOT NULL");
    }

}
