import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { ArtistGender } from './artiists.type';
import { Song } from '../songs/songs.schema';

@Entity()
export class Artist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'nvarchar',
        length: 50
    })
    name: string;

    @Column({
        type: 'enum',
        enum: ArtistGender,
        default: ArtistGender.Other,
    })
    gender: number;

    @ManyToMany(() => Song)
    @JoinTable({name: 'artistSongs'})
    songs: Song[];

    @Column({
        type: 'date',
        nullable: true,
    })
    debut: Date;
}