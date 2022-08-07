import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigrations1658564047694 implements MigrationInterface {
    name = 'InitMigrations1658564047694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists_favorites" ("id" character varying NOT NULL, CONSTRAINT "PK_e529ac827c0f3b9e8aab86d2f80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums_favorites" ("id" character varying NOT NULL, CONSTRAINT "PK_907a6176b3a7e72c03a761001bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks_favorites" ("id" character varying NOT NULL, CONSTRAINT "PK_7e010bb0f7b03b29a81856c5aa1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tracks_favorites"`);
        await queryRunner.query(`DROP TABLE "albums_favorites"`);
        await queryRunner.query(`DROP TABLE "artists_favorites"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}
