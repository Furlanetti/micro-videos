import Category from "category/domain/entities/category";

export class CreateCategoryUseCase {
  execute(input: any) {
    const entity = new Category(input);
  }
}
