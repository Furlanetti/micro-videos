import InMemoryRepository from "@seedwork/domain/repository/in-memory.repository";
import Category from "category/domain/entities/category";
import CategoryRepository from "category/domain/repository/category.repository";

export default class CategoryInMemoryRepository
  extends InMemoryRepository<Category>
  implements CategoryRepository {}
