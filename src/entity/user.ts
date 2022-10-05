import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Todo } from "./todo"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;
        
    @Column()
    password: string;

    @Column()
    fullName: string;

    @OneToMany(()=>Todo,task=>task.user)
    todos: Todo[];
}
