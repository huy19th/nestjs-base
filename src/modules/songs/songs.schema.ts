import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
} from 'typeorm';
import { Artist } from '../artists/artists.schema';

@Entity()
export class Song {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'nvarchar',
        length: 100,
    })
    title: string;

    @Column({
        type: 'date',
        nullable: true,
    })
    releaseDate: Date;

    @ManyToMany(() => Artist)

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}