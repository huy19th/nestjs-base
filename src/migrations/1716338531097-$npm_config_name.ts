import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1716338531097 implements MigrationInterface {
    name = ' $npmConfigName1716338531097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`song\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(100) NOT NULL, \`releaseDate\` date NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`artist\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`gender\` enum ('0', '1', '2') NOT NULL DEFAULT '2', \`debut\` date NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`artistSongs\` (\`artistId\` varchar(36) NOT NULL, \`songId\` varchar(36) NOT NULL, INDEX \`IDX_c5049a5497dc9777076c2b2b8f\` (\`artistId\`), INDEX \`IDX_626fb9ec5045c7959f2507773d\` (\`songId\`), PRIMARY KEY (\`artistId\`, \`songId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`artistSongs\` ADD CONSTRAINT \`FK_c5049a5497dc9777076c2b2b8f5\` FOREIGN KEY (\`artistId\`) REFERENCES \`artist\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`artistSongs\` ADD CONSTRAINT \`FK_626fb9ec5045c7959f2507773d8\` FOREIGN KEY (\`songId\`) REFERENCES \`song\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`artistSongs\` DROP FOREIGN KEY \`FK_626fb9ec5045c7959f2507773d8\``);
        await queryRunner.query(`ALTER TABLE \`artistSongs\` DROP FOREIGN KEY \`FK_c5049a5497dc9777076c2b2b8f5\``);
        await queryRunner.query(`DROP INDEX \`IDX_626fb9ec5045c7959f2507773d\` ON \`artistSongs\``);
        await queryRunner.query(`DROP INDEX \`IDX_c5049a5497dc9777076c2b2b8f\` ON \`artistSongs\``);
        await queryRunner.query(`DROP TABLE \`artistSongs\``);
        await queryRunner.query(`DROP TABLE \`artist\``);
        await queryRunner.query(`DROP TABLE \`song\``);
    }

}
