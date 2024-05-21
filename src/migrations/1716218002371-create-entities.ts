import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1716218002371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE artist (
                id varchar(36) NOT NULL,
                name varchar(50) NOT NULL,
                gender enum('0','1','2') NOT NULL DEFAULT '2',
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);

        await queryRunner.query(`
            CREATE TABLE song (
                id varchar(36) NOT NULL,
                title varchar(100) NOT NULL,
                releaseDate date DEFAULT NULL,
                createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                deletedAt datetime(6) DEFAULT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);

        await queryRunner.query(`
            CREATE TABLE artistSongs (
                artistId varchar(36) NOT NULL,
                songId varchar(36) NOT NULL,
                PRIMARY KEY (artistId,songId),
                KEY IDX_c5049a5497dc9777076c2b2b8f (artistId),
                KEY IDX_626fb9ec5045c7959f2507773d (songId),
                CONSTRAINT FK_626fb9ec5045c7959f2507773d8 FOREIGN KEY (songId) REFERENCES song (id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT FK_c5049a5497dc9777076c2b2b8f5 FOREIGN KEY (artistId) REFERENCES artist (id) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
