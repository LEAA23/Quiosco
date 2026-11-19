import { Category } from "@/src/generated/prisma/client"

type CategoryIconProps = {
    category: Category;
}

const CategoryIcon = ({category} : CategoryIconProps) => {
  return (
    <div>{category.name}</div>
  )
}

export default CategoryIcon