import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity('categories')
@Tree('materialized-path')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children?: Category[];
}
